import { Router } from "express";
import {
  deleteNotes,
  getNotes,
  postNotes,
  putNotes,
} from "../utils/notes.controller.js";

const router = Router();

router.post("/get", getNotes);
router.post("/", postNotes);
router.put("/:id", putNotes);
router.delete("/:id", deleteNotes);

export default router;
