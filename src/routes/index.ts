import { Router } from "express";
import { getNotes, addNote, updateNote, deleteNote } from "../controllers/notes"

const router: Router = Router()

router.get("/notes", getNotes)

router.post("/add-note", addNote)

router.put("/edit-note/:id", updateNote)

router.delete("/delete-note/:id", deleteNote)

export default router;