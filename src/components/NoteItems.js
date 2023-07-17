import React from 'react'
import NoteContext from "../context/NoteContext";
import { useContext } from 'react';
const NoteItems = (props) => {
    const {note,updateNote}=props;
    const context=useContext(NoteContext)
    const {deleteNote}=context;
  return (
    <div className='col-md-3'>
      <div className="card my-3">
  <div className="card-body">
    <h5 className="card-title">{note.title}</h5>
    <p className="card-text">{note.description}</p>
    <i className="fa fa-trash" onClick={()=>{deleteNote(note._id);props.showAlert("Deleted Successfullt","success");}}></i>
    <i className="fa fa-pen-to-square mx-3" onClick={()=>{updateNote(note)}}></i>
  </div>
</div>
    </div>
  )
}

export default NoteItems
