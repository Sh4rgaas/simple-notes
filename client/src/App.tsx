import React, { useEffect, useState } from 'react';
import NoteItem from './components/NoteItem';
import AddNote from './components/AddNote';
import { getNotes, addNote, updateNote, deleteNote } from './API';

const App: React.FC = () => {
  const [notes, setNotes] = useState<INote[]>([])

  useEffect(() => {
    fetchNotes()
  }, [])

  const fetchNotes = (): void => {
    getNotes()
    .then(({ data: { notes } }: INote[] | any) => setNotes(notes))
    .catch((err: Error) => console.log(err))
  };

  const handleSaveNote = (e: React.FormEvent, formData: INote): void => {
    e.preventDefault();
    addNote(formData)
      .then(({ status, data }) => {
        if (status !== 201) {
          throw new Error("Error! Note not saved")
        }
        setNotes(data.notes)
      })
      .catch(err => console.log(err))
  }

  const handleUpdateNote = (note: INote): void => {
    updateNote(note)
      .then(({ status, data }) => {
        if (status !== 200) {
          throw new Error("Error! Note not updated")
        }
        setNotes(data.notes)
      })
      .catch(err => console.log(err))
  }
  
  const handleDeleteNote = (_id: string): void => {
    deleteNote(_id)
      .then(({ status, data }) => {
        if (status !== 200) {
          throw new Error("Error! Note not deleted")
        }
        setNotes(data.notes)
      })
      .catch(err => console.log(err))
  }

  return (
    <main className='App'>
      <h1>Simple Notes</h1>
      <AddNote saveNote={handleSaveNote} />
      {notes.map((note: INote) => (
        <NoteItem
          key={note._id}
          updateNote={handleUpdateNote}
          deleteNote={handleDeleteNote}
          note={note}
        />
      ))}
    </main>
  )
}

export default App;
