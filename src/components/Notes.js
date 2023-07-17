import React, { useContext, useEffect, useRef ,useState} from 'react'
import noteContext from '../context/NoteContext';
import NoteItems from './NoteItems';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';
const Notes = (props) => {
  const navigate=useNavigate();
  const context = useContext(noteContext);
  const { notes, getNotes,editNote} = context;
  const [note,setNote]=useState({id:"",etitle:"",edescription:"",etag:""})
  
  const ref = useRef(null)
  const refclose = useRef(null)

  useEffect(() => {
if(localStorage.getItem('token'))
{
  getNotes();
}
else{
  navigate('/login')
}

    // eslint-disable-next-line
  }, [])
//   useEffect(() => {
// if(localStorage.getItem('token'))
// {
//   getNotes();
// }
// else{
//   navigate('/login')
// }

//     // eslint-disable-next-line
//   }, [])
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
    props.showAlert("Note updated successfully","success")
  }
  const handleClick=(e)=>
  {
    editNote(note.id,note.etitle,note.edescription,note.etag)
    refclose.current.click();
    props.showAlert("Updated successfully Successfullt","success")

  }
  const onChange=(e)=>
  {
          setNote({...note,[e.target.name]:e.target.value})
          // console.log([e.target.name])
  }

  return (<>
    <AddNote showAlert={props.showAlert} />
    <button ref={ref} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{display:'none'}}>
      Launch demo modal
    </button>
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form className='my-3'>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <input type="text" className="form-control" id="edescription" value={note.edescription} name="edescription" onChange={onChange} minLength={5} required/>
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">Tag</label>
                <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} minLength={5} required  />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" ref={refclose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button  disabled={note.etitle.length<5 || note.edescription.length<5} type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div className="row my-3">
        <h1>Your Notes</h1>
        <div className="contain">
        {notes.length===0 &&"No Notes to display"}
          </div>
          {notes &&notes.map((note) => (
              <NoteItems
                key={note._id}
                updateNote={updateNote}
                note={note}
                showAlert={props.showAlert}
              />
            ))}
      </div>
    </div>
  </>
  )
}

export default Notes
