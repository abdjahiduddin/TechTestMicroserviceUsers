import { Router } from "express";
import IndexControllers from "../controllers/IndexControllers";

const router = Router();

router.post("/create", IndexControllers.UsersController.createUser)
router.get("/get-all", IndexControllers.UsersController.getAllUsers);

export default router;
