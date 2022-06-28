"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notes_1 = require("../controllers/notes");
const router = (0, express_1.Router)();
router.get("/notes", notes_1.getNotes);
router.post("/add-note", notes_1.addNote);
router.put("/edit-note/:id", notes_1.updateNote);
router.delete("/delete-note/:id", notes_1.deleteNote);
exports.default = router;
