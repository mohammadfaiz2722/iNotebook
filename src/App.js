// import logo from './logo.svg';
// import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home1 from './components/Home1';
import About from './components/About';
import Navbar from './components/Navbar'
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';

function App() {
  // Inside your React component
// useEffect(() => {
//   fetch("/.netlify/functions/hello")
//     .then((response) => response.json())
//     .then((data) => console.log(data));
// }, []);

  const [alert,setAlert]=useState(null)
  const showAlert=((message,type)=>
  {
    setAlert({
      message:message,
      type:type
    })
    setTimeout(()=>
    {
      setAlert(null)
    },1000)
  })
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert}/>
          <div className="container">

          <Routes>
            <Route exact path="/" element={<Home1 showAlert={showAlert} />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/login" element={<Login showAlert={showAlert}/>} />
            <Route exact path="/signup" element={<Signup showAlert={showAlert}/>} />
          </Routes>
          </div>
        </Router>
      </NoteState>
    </>

  );
}

export default App;
