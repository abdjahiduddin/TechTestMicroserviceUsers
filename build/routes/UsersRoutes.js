"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _expressValidator = require("express-validator");
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
var _IndexControllers = _interopRequireDefault(require("../controllers/IndexControllers"));
var _validation = _interopRequireDefault(require("../helper/validation"));
var _auth = _interopRequireDefault(require("../helper/auth"));
var _users = _interopRequireDefault(require("../models/users"));
var router = (0, _express.Router)();
router.post("/create", _auth["default"].isAuth, _auth["default"].isAdmin, [(0, _expressValidator.body)("email").isEmail().withMessage("Please enter valid email").trim().custom(function (value) {
  return _users["default"].findOne({
    email: value
  }).then(function (result) {
    if (result) {
      return Promise.reject("Email already exists");
    }
  });
}).normalizeEmail(), (0, _expressValidator.body)("username").trim().not().isEmpty().withMessage("Username should not empty"), (0, _expressValidator.body)("fullname").trim().not().isEmpty().withMessage("Fullname should not empty"), (0, _expressValidator.body)("password").trim().isLength({
  min: 7
}).withMessage("Password minimal length 7"), (0, _expressValidator.body)("type").trim().isIn(["admin", "user"]).withMessage("Type value should admin or user")], _validation["default"].result, _IndexControllers["default"].UsersController.createUser);
router.get("/all", _auth["default"].isAuth, _auth["default"].isAdmin, _IndexControllers["default"].UsersController.getAllUsers);
router.get("/one/:userId", _auth["default"].isAuth, [(0, _expressValidator.param)("userId").isMongoId().withMessage("Invalid ID")], _validation["default"].result, _auth["default"].isUser, _IndexControllers["default"].UsersController.getOneUser);
router.put("/profile/:userId", _auth["default"].isAuth, _auth["default"].isAdmin, [(0, _expressValidator.param)("userId").isMongoId().withMessage("Invalid user ID"), (0, _expressValidator.body)("email").isEmail().withMessage("Please enter valid email").trim().normalizeEmail(), (0, _expressValidator.body)("username").trim().not().isEmpty().withMessage("Username should not empty"), (0, _expressValidator.body)("fullname").trim().not().isEmpty().withMessage("Fullname should not empty")], _validation["default"].result, _IndexControllers["default"].UsersController.updateUserProfile);
router.put("/password/:userId", _auth["default"].isAuth, _auth["default"].isAdmin, [(0, _expressValidator.param)("userId").isMongoId().withMessage("Invalid user ID"), (0, _expressValidator.body)("newPassword").trim().isLength({
  min: 7
}).withMessage("Password minimal length 7"), (0, _expressValidator.body)("oldPassword").trim().custom(function (value, _ref) {
  var req = _ref.req;
  return _users["default"].findById(req.params.userId, {
    password: 1
  }).then(function (result) {
    return _bcryptjs["default"].compare(value, result.password);
  }).then(function (isEqual) {
    if (!isEqual) return Promise.reject("Old password wrong");
  });
})], _validation["default"].result, _IndexControllers["default"].UsersController.updateUserPassword);
router.put("/type/:userId", _auth["default"].isAuth, _auth["default"].isAdmin, [(0, _expressValidator.param)("userId").isMongoId().withMessage("Invalid user ID"), (0, _expressValidator.body)("type").trim().isIn(["admin", "user"]).withMessage("Type value should admin or user")], _validation["default"].result, _IndexControllers["default"].UsersController.updateUserType);
router["delete"]("/delete/:userId", _auth["default"].isAuth, _auth["default"].isAdmin, [(0, _expressValidator.param)("userId").isMongoId().withMessage("Invalid user ID")], _validation["default"].result, _IndexControllers["default"].UsersController.deleteUser);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=UsersRoutes.js.map