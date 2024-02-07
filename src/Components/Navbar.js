import { Link } from 'react-router-dom';
import classes from './Navbar.module.css'
import { Outlet } from 'react-router-dom';

let Navbar = ()=>{
    return <div className={classes.cont}>
          <div className={classes.navbar}>
    <Link to='/' className={classes.button}>Compose</Link>
    <Link to='/outbox'className={classes.button}>Inbox</Link>
    <Link to='/outbo' className={classes.button}>Sent</Link>
    </div>
    <div className={classes.outle}>
        <Outlet/>
        </div>

    </div>
   
};
export default Navbar;