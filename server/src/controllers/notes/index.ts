import { Response, Request } from "express";
import { INote } from "./../../types/note";
import Note from "../../models/note";

const getNotes = async (req: Request, res: Response): Promise<void> => {
  try {
    const notes: INote[] = await Note.find()
    res.status(200).json({ notes })
  } catch (error) {
    throw error
  }
}

const addNote = async (req: Request, res: Response): Promise<void> => {
    try {
      const body = req.body as Pick<INote, "name" | "description" | "status">
      
      const note: INote = new Note({
        name: body.name,
        description: body.description,
        status: body.status,
      });

      console.log({ body, note });
      const newNote: INote = await note.save()
      const allNotes: INote[] = await Note.find()
  
      res
        .status(201)
        .json({ message: "Note added", note: newNote, notes: allNotes })
    } catch (error) {
      throw error
    }
  }

  const editNote = async (req: Request, res: Response): Promise<void> => {
    try {
      const {
        params: { id },
        body,
      } = req
      const editNote: INote | null = await Note.findByIdAndUpdate(
        { _id: id },
        body
      )
      const allNotes: INote[] = await Note.find()
      res.status(200).json({
        message: "Note edited",
        note: editNote,
        notes: allNotes,
      })
    } catch (error) {
      throw error
    }
  }

  const updateNote = async (req: Request, res: Response): Promise<void> => {
    try {
      const { params: { id }, body } = req
      const updateNote: INote | null = await Note.findByIdAndUpdate(
        { _id: id },
        body
      )
      const allNotes: INote[] = await Note.find()
      res.status(200).json({
        message: "Note updated",
        note: updateNote,
        notes: allNotes,
      })
    } catch (error) {
      throw error
    }
  }

  const deleteNote = async (req: Request, res: Response): Promise<void> => {
    try {
      const deletedNote: INote | null = await Note.findByIdAndRemove(
        req.params.id
      )
      const allNotes: INote[] = await Note.find()
      res.status(200).json({
        message: "Note deleted",
        note: deletedNote,
        notes: allNotes,
      })
    } catch (error) {
      throw error
    }
  }
  
  export { getNotes, addNote, updateNote, deleteNote, editNote };