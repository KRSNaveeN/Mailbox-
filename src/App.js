import logo from './logo.svg';
import './App.css';
import Authentication from './Components/Authentication';
import { useSelector } from 'react-redux';
import Mail from './Components/Mail';

import './Editor.css'; 

function App() {
    let token =   useSelector((state)=>state.token);
  return (
    <div >
      {!token ?  <Authentication/> : <Mail/>}
      
    </div>
  );
}

export default App;
