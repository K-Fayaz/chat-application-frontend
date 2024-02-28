import React from 'react';
import ReactDOM from 'react-dom/client';
import './CSS/index.css';
import { BrowserRouter as Router , Routes , Route } from "react-router-dom";
import UserAuth from './Screens/Auth';
import Login from './Components/Login';
import Register from './Components/Register';
import Messages from './Screens/Messages';
import ShowMessages from './Screens/showMessages';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
          <Route path='auth' element={<UserAuth/>}>
            <Route path='login' element={<Login/>}/>
            <Route path='register' element={<Register/>}/>
          </Route>
          <Route path='messages' element={<Messages/>}>
              <Route path=':id' element={<ShowMessages/>} />
          </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);