import React from "react";
import NoteContext from "../NoteContext";
import { useState} from "react";

const NoteState = (props) => {
  const host="https://inotebook-12.onrender.com"
// let noteInitial=[]
  const [notes,setNotes]=useState([])
  //Add a note
  const getNotes = async () => {
    try {
      const response = await fetch(`${host}/api/notes/fetchallnote`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('token')
        },
      });
      const data = await response.json();
      setNotes(data);
      // Process the data or update state as needed
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  const addNote = async (title, description, tag) => {
    //API call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
       "auth-token":localStorage.getItem('token')
      },
    
      body: JSON.stringify({title,description,tag})
    });
    const note=await response.json();
    setNotes((prevNotes) => [...prevNotes, note]);
    // console.log(json);
    // const note =json;
  // setNotes(notes.concat(note))
  };
  // Delete a note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });
    const json = await response.json();
    console.log(json);
    let newNotes = notes.filter((note) => note._id !== id);
    setNotes(newNotes);
  };

// Edit a note
const editNote=async (id,title,description,tag)=>
{
  // API call
  const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
     "auth-token":localStorage.getItem('token')
    },
  
    body: JSON.stringify({title,description,tag})
  });
  const json= await response.json();
  console.log(json);
  // Logic to edit in client
  let newNotes=JSON.parse(JSON.stringify(notes))
for(let index=0;index<newNotes.length;index++)
{
  const element= newNotes[index];
  if(element._id===id)
  {
    newNotes[index].title=title
    newNotes[index].description=description
    newNotes[index].tag=tag
    break;
  }
}
setNotes(newNotes)
// getNotes()
}
    return (
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes}}>

            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;