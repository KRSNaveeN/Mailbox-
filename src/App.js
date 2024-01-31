import logo from './logo.svg';
import './App.css';
import Authentication from './Components/Authentication';
import { useSelector } from 'react-redux';

function App() {
    let token =   useSelector((state)=>state.token);
  return (
    <div >
      {!token ?  <Authentication/> : <h3>welcome to mailbox client</h3>}
    </div>
  );
}

export default App;
