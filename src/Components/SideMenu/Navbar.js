import { Link } from 'react-router-dom';
import classes from './Navbar.module.css'
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

let Navbar = ()=>{

    let user = useSelector(state => state.email);
    let count = useSelector(state=>state.count);
    const trimmedLoginEmail = user.replace("@gmail.com", "");
    return <div>
        <div className={classes.bar}>
            <Link to="/inbox"><img className={classes.imge} src='Gmail-logo.png'/></Link>
            <div className={classes.bold}>Welcome {trimmedLoginEmail}</div>
        </div>
        <div className={classes.container}>
              <div className={classes.navbar}>
                   <Link to='/' className={classes.button}>Compose</Link>
                   <Link to='/inbox'className={classes.button}>Inbox{count}</Link>
                   <Link to='/outbox' className={classes.button}>Sent</Link>
                   <Link className={classes.button}>Drafts</Link>
                   <Link className={classes.button}>Settings</Link>
                   <Link className={classes.button}>Spam</Link>
                   <Link className={classes.button}>Bin</Link>
                   
               </div>

               <div className={classes.outlet}>
                 <Outlet/>
               </div>

            </div>
    </div>
   
};
export default Navbar;