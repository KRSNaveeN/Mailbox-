import logo from './logo.svg';
import './App.css';
import Authentication from './Components/Authentication';
import { useSelector } from 'react-redux';
import Mail from './Components/Mail';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import './Editor.css'; 
import Navbar from './Components/Navbar';
import Compose from './Components/Compose';
import Inbox from './Components/Inbox';

function App() {
    let token =   useSelector((state)=>state.token);
  return (
    <BrowserRouter >
      <Routes>
      {!token ? <Route path='/' element ={<Authentication/>}/> : <Route path='/' element = {<Navbar/>}>
        <Route path='/' element={<Compose/>}/>
        <Route path='/outbox' element = {<Inbox/>}/>
        <Route path='/compose' element={<Mail/>}/>
        </Route>}

      </Routes>
     
      
    </BrowserRouter>
  );
}

export default App;
