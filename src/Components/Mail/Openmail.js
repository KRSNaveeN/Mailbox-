import { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import classes from './Openmail.module.css';
import { authActions } from "../../Store/auth";

let OpenMail = ()=>{
    let [values, setValues] = useState([]);
    let dispatch = useDispatch();
    let datay = useParams();
    
    let mail = localStorage.getItem("logged");
    let trimmedmail = mail.replace("@gmail.com", "")
    useEffect(()=>{
      async  function abc(){
        let ans  = await fetch(`https://mailbox-76501-default-rtdb.firebaseio.com/${trimmedmail}/${datay.box}.json`);
        let data = await ans.json();
        console.log(data);
        let x = Object.values(data);
        let a = x.filter((item)=> item.id == datay.userid);
         setValues(a);
         let total = 0;
         if(datay.box == "inbox"){
         x.map((item)=>{
          if(item.read == false){
              total++;
          }});
          dispatch(authActions.count(total));
          dispatch(authActions.token(trimmedmail));
        }
        };
      
        
        abc();
    }, []);
     
    return<div className={classes.cont}>
       {
         values.map((item)=>{
            return<>
           <div>From : {datay.box == "inbox" ? item.sender : trimmedmail } </div> 
           <div>To : {datay.box == "inbox" ? trimmedmail : item.receiver}</div>
           <p> Subject : {item.subject}</p>
           <div>{item.body}</div>
            </>
         })
       }
    </div>
}
export default OpenMail;