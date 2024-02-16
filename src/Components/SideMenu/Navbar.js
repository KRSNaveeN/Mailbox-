import { Link } from 'react-router-dom';
import classes from './Navbar.module.css'
import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../../Store/auth';
import { useEffect } from 'react';

let Navbar = ()=>{
    let dispatch = useDispatch();
    let user = localStorage.getItem("logged");
    let count = useSelector(state=>state.count);
    let trimmedLoginEmail;
    if(user){
         trimmedLoginEmail = user.replace("@gmail.com", "");
    }
    let fetchingdata = async () => {
        
        try {
            const response = await fetch(`https://mailbox-76501-default-rtdb.firebaseio.com/${trimmedLoginEmail}/inbox.json`);
             if (!response.ok) {throw new Error('Failed to fetch data')}
              const data = await response.json();
              let arr = Object.values(data);
             let total  = 0;
            arr.map((item)=>{
                if(item.read == false){
                    total++;
                }});
            dispatch(authActions.count(total));
        } catch (err) {
            console.error('Error fetching data:', err);
        }
    };

    useEffect(()=>{
        fetchingdata();
       let x = setInterval(()=>{fetchingdata();}, 10000);
    return ()=>{ clearInterval(x)};
    },[])
   
    console.log(user);
    let logoutHandler =()=>{
      
        dispatch(authActions.token(null));
        dispatch(authActions.toggle());  
        localStorage.removeItem("logged");
    }

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
                   <Link className={classes.button}>Bin</Link>
                  <Link to='/' className={classes.button}><div onClick={logoutHandler} >Logout</div></Link> 
                  
                   
               </div>

               <div className={classes.outlet}>
                 <Outlet/>
               </div>

            </div>
    </div>
   
};
export default Navbar;