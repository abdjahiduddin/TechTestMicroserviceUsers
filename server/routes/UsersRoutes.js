import { Router } from "express";
import { body, param } from "express-validator";
import bcrypt from "bcryptjs";

import IndexControllers from "../controllers/IndexControllers";
import validation from "../helper/validation";
import Users from "../models/users";

const router = Router();

router.post(
  "/create",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter valid email")
      .trim()
      .custom((value) => {
        return Users.findOne({ email: value }).then((result) => {
          if (result) {
            return Promise.reject("Email already exists");
          }
        });
      })
      .normalizeEmail(),
    body("username")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Username should not empty"),
    body("fullname")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Fullname should not empty"),
    body("password")
      .trim()
      .isLength({ min: 7 })
      .withMessage("Password minimal length 7"),
    body("type")
      .trim()
      .isIn(["admin", "user"])
      .withMessage("Type value should admin or user"),
  ],
  validation.result,
  IndexControllers.UsersController.createUser
);

router.get("/all", IndexControllers.UsersController.getAllUsers);

router.get(
  "/one/:userId",
  [param("userId").isMongoId().withMessage("Invalid ID")],
  validation.result,
  IndexControllers.UsersController.getOneUser
);

router.put(
  "/profile/:userId",
  [
    param("userId").isMongoId().withMessage("Invalid user ID"),
    body("email")
      .isEmail()
      .withMessage("Please enter valid email")
      .trim()
      .normalizeEmail(),
    body("username")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Username should not empty"),
    body("fullname")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Fullname should not empty"),
  ],
  validation.result,
  IndexControllers.UsersController.updateUserProfile
);

router.put(
  "/password/:userId",
  [
    param("userId").isMongoId().withMessage("Invalid user ID"),
    body("newPassword")
      .trim()
      .isLength({ min: 7 })
      .withMessage("Password minimal length 7"),
    body("oldPassword")
      .trim()
      .custom((value, { req }) => {
        return Users.findById(req.params.userId, { password: 1 })
          .then((result) => {
            return bcrypt.compare(value, result.password);
          })
          .then((isEqual) => {
            if (!isEqual) return Promise.reject("Old password wrong");
          });
      }),
  ],
  validation.result,
  IndexControllers.UsersController.updateUserPassword
);

router.put(
  "/type/:userId",
  [
    param("userId").isMongoId().withMessage("Invalid user ID"),
    body("type")
      .trim()
      .isIn(["admin", "user"])
      .withMessage("Type value should admin or user"),
  ],
  validation.result,
  IndexControllers.UsersController.updateUserType
);

router.delete(
  "/delete/:userId",
  [param("userId").isMongoId().withMessage("Invalid user ID")],
  validation.result,
  IndexControllers.UsersController.deleteUser
);

export default router;
