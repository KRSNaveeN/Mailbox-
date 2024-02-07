import { useEffect,useState } from "react";
import {  useSelector } from "react-redux";
import classes from './Inbox.module.css';
import { Col,Row } from 'react-bootstrap';

let Inbox = ()=>{
    let [emails, setEmails] = useState([]);
  let loginemail =  useSelector(state =>state.email);
    let trimmedloginmail = loginemail.replace("@gmail.com", "");
    let Fetchingdata = async ()=>{
        
        try{
        let reponse = await  fetch(`https://mailbox-76501-default-rtdb.firebaseio.com/${trimmedloginmail}.json`);
        let ans = await reponse.json();
        // console.log(ans);
        let arr = Object.values(ans);
        console.log(arr);
        setEmails(arr);
        }
        catch(err){
            console.log(err);
        }
    
    }
    useEffect(()=>{
         Fetchingdata();
    }, []);

    return<div className={classes.cont}>
       
       {
        emails.map((item)=>{
            return <div className={classes.inbox}>
                <Row> 
                    <Col xs={1}><input type="checkbox"/>{item.email}:</Col>
                    <Col xs={10}><p>{item.subject}</p></Col>
                    <Col xs={1}><button>Delete</button></Col>
                    </Row>
            </div>
        })
       }
    </div>
};
export default Inbox;