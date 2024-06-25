import './CSS/App.css';

import { BrowserRouter as Router , Routes , Route } from "react-router-dom";
import UserAuth from './Screens/Auth';
import Login from './Components/Login';
import Register from './Components/Register';
import Messages from './Screens/Messages';
import ShowMessages from './Screens/showMessages';
import ChooseAvatar from './Screens/ChooseAvatar';
import ProtectedRoutes from './Utils/ProtectedRoutes';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
            <Route path='auth' element={<UserAuth/>}>
              <Route path='login' element={<Login/>}/>
              <Route path='register' element={<Register/>}/>
            </Route>
            <Route path='/' element={<Messages/>}>
                <Route path=':id' element={<ShowMessages/>} />
            </Route>
            <Route path='/avatar' element={<ChooseAvatar/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

