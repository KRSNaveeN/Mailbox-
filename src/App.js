
import './App.css';
import Authentication from './Components/Authentication/Authentication';
import { useSelector } from 'react-redux';
import Mail from './Components/Outbox/Outbox';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import './Components/Editor/Editor.css'; 
import Outbox from './Components/Outbox/Outbox';
import Navbar from './Components/SideMenu/Navbar';
import Compose from './Components/ComposeMail/Compose';
import Inbox from './Components/Inbox/Inbox';
import OpenMail from './Components/Mail/Openmail';

function App() {
    let token =   useSelector((state)=>state.token);
  return (
    <BrowserRouter >
      <Routes>
      {!token ? <Route path='/' element ={<Authentication/>}/> : <Route path='/' element = {<Navbar/>}>
        <Route path='/' element={<Compose/>}/>
        <Route path='/inbox' element = {<Inbox/>}/>
      
        <Route path='/outbox' element={<Outbox/>}/>
        <Route path='/inbox/:userid' element = {<OpenMail/>}/>
        </Route>}

      </Routes>
     
      
    </BrowserRouter>
  );
}

export default App;
