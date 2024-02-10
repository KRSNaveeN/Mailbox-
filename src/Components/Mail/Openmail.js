import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import classes from './Openmail.module.css';

let OpenMail = ()=>{
    let [values, setValues] = useState([]);
    let id = useParams();
    console.log(id.userid);
    let mail = useSelector(state => state.email);
    let names = useSelector(state => state.receivedmail);
    let trimmedmail = mail.replace("@gmail.com", "")
    useEffect(()=>{
      async  function abc(){
        let ans  = await fetch(`https://mailbox-76501-default-rtdb.firebaseio.com/${trimmedmail}/inbox.json`);
        let data = await ans.json();
        console.log(data);
        let x = Object.values(data);
        let a = x.filter((item)=> item.id == id.userid);
         setValues(a);
        };
        abc();
    }, []);
     
    return<div className={classes.cont}>
       {
         values.map((item)=>{
            return<>
           <div>From : {item.sender} </div> 
           <div>To : {trimmedmail}</div>
           <p> Subject : {item.subject}</p>
           <div>{item.body}</div>
            </>
         })
       }
    </div>
}
export default OpenMail;