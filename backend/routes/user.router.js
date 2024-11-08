import { Router } from "express";
import {
  deleteUser,
  getUser,
  login,
  signUp,
  updateUser,
} from "../utils/users.controller.js";

const router = Router();

router.post("/register", signUp);
router.post("/login", login);
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
