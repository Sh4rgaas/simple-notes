import React from "react";

type Props = NoteProps & {
  updateNote: (note: INote) => void;
  deleteNote: (_id: string) => void;
}

const Note: React.FC<Props> = ({ note, updateNote, deleteNote }) => {
  const checkNote: string = note.status ? `line-through` : ""
  return (
    <div className="Card">
      <div className="Card--text">
        <h1 className={checkNote}>{note.name}</h1>
        <span className={checkNote}>{note.description}</span>
      </div>
      <div className="Card--button">
        <button
          onClick={() => updateNote(note)}
          className={note.status ? `hide-button` : "Card--button__done"}
        >
          Complete
        </button>
        <button
          onClick={() => deleteNote(note._id)}
          className="Card--button__delete"
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default Note;