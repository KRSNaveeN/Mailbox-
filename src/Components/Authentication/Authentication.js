import { useState } from 'react';
import classes from './Authentication.module.css';
import { authActions } from '../../Store/auth';

import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';
const Authentication = ()=>{

    const [validate,setValidate] = useState('');
    
let email = useRef();
let password = useRef();
    const login = useSelector((state)=>state.login);
    
    const dispatch = useDispatch();
    
  const submitHandler = async (e)=>{
    e.preventDefault();
     setValidate("was-validated");   
     let data = {
        email : email.current.value,
        password: password.current.value,
        returnSecureToken : true
     }
     let url
     if(!login){
        url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB0RLysxCkfqR-gxhVXegua5OoXbqsTR-Q"
     }
     else{
        url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB0RLysxCkfqR-gxhVXegua5OoXbqsTR-Q"
     }
    let response = await fetch(url,{
        method : "POST",
        body : JSON.stringify(data)
     });

     try{
        if(response.ok){
            let data = await response.json();
            dispatch(authActions.token(data.idToken));
            dispatch(authActions.mail(data.email));
            console.log(data);
            console.log("success");
        }
        else
        {
            throw new Error("authentication failed");
        }
     }

     catch(err){
        alert(err);
        console.log(err);
     }
     
    }

const toggleHandler = ()=>{
    dispatch(authActions.log());
}

    return<>

      <div className={classes.backdrop}>
        <div className={classes.auth}>{login ? "Signup" : "Login"}</div>
      <form onSubmit={submitHandler} className={validate}>
          <div className="form-floating">
          <input ref={email} type="email" required className="form-control form-control" placeholder='naveen'/>
          <label>Email</label>
          </div>

          <div className={`form-floating  ${classes.gaps}`}>
          <input ref={password} type='password' required className="form-control form-control" placeholder='naveen'/>
          <label>Password</label>
          </div>

          <div className="form-floating gaps">
          <input type="password" required className="form-control form-control" placeholder='naveen'/>
          <label>Confirm Password</label>
          </div>
         
          <div className={classes.auth}>
          <button className={`btn btn-primary ${classes.siz}`}>{login ? "Signup" : "Login"}</button>
          </div>
         
        </form>
    </div>

    <div className={classes.toggle}>
    
        <button  onClick={toggleHandler} className={`btn btn-danger`}>{login ? "Already have an Account? Login" : "Signup with new Account"}</button>

        
    </div>
    
    </>
   
};

export default Authentication;