
import './App.css';
import React, {useState} from 'react';
import Capsule from './components/Capsule';
import GetAllCapsule from './context/spacexState';
import {BrowserRouter as Router,Routes,Route } from "react-router-dom";
import SignUp from './components/Signup';
import Login from './components/Login';
function App() {
  const [alert, setAlert] = useState(null);
  const showAlert= (message, type )=>{
    setAlert({msg:message, type:type});
    setTimeout(()=>{setAlert(null)}, 1000);
  }
  return (
    <div className="App">
      <GetAllCapsule>
       
        <Router>
        <Routes>
         <Route exact path="/" element ={<SignUp  showAlert ={showAlert}/>} />
          <Route exact path="/"  element ={<SignUp  />} />
          <Route exact path="/login" element ={<Login showAlert ={showAlert}/>} />
          <Route exact path="/capsule" element ={<Capsule showAlert ={showAlert}/>} />
        </Routes>
        </Router>
      </GetAllCapsule>
    </div>
  );
}

export default App;
