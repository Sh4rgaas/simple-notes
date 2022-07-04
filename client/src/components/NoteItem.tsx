import React, { useState, useEffect } from 'react';
import dateFormat from 'dateformat';

type Props = NoteProps & {
  updateNote: (note: INote) => void;
  editNote: (note: INote) => void;
  deleteNote: (_id: string) => void;
};

const Note: React.FC<Props> = ({ note, updateNote, editNote, deleteNote  }) => {
  const [editMode, setEditMode] = useState(false);
  const [editName, setEditName] = useState('');
  const [editDescription, setEditDescription] = useState('');

  useEffect(() => {
    
  }, [note]);

  const checkNote: string = note.status ? `line-through` : '';
  return (
    <div className='Card'>
      <div className='Card--text'>
        { editMode ? (
          <div>
            <label htmlFor="Name">Name</label>
            <input id='name' value={editName} onChange={(e) => {
              setEditName(e.currentTarget.value);
            }} />
          </div>
        ) : (
          <h1 className={checkNote}>
            {note.name}
          </h1>
        )}
        { editMode ? (
          <div>
          <label htmlFor="Description">Description</label>
          <input id='description' value={editDescription} onChange={e => setEditDescription(e.currentTarget.value) }/>
        </div>
        ) : (
          <h2 className={checkNote}>{note.description}</h2>
        )}

        <p className={editMode ? `hide-button` : checkNote}>
          Created at: {dateFormat(note.createdAt, 'dddd, mmmm dS, yyyy')}
          </p>
      </div>
      { editMode ? (
        <div className='Card--button'>
          <button
            className='Card--button__done'
            onClick={async () => {
              note.name = editName;
              note.description = editDescription;
              await editNote(note);
              setEditMode(false);
            }}
          >
            Save
          </button>
        </div>
      ) : (
        <div className='Card--button'>
          <button
            onClick={() => updateNote(note)}
            className={note.status ? `hide-button` : 'Card--button__done'}
          >
            Complete
          </button>
          <button
            onClick={() => {
              setEditMode(true);
              setEditName(note.name);
              setEditDescription(note.description);
            }}
            className='Card--button__edit'
          >
            Edit
          </button>
          <button
            onClick={() => deleteNote(note._id)}
            className='Card--button__delete'
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default Note;
