import classes from './Outbox.module.css';
import { useState,useEffect} from 'react';
import { Row,Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
   

const Outbox = ()=>{

    let [outboxmail,  setOutboxmail] = useState([]);
    const loginEmail = useSelector(state => state.email);
    const trimmedloginmail = loginEmail.replace("@gmail.com", "");

    useEffect(()=>{
         let outboxHandler = async ()=>{
        let response  = await fetch(`https://mailbox-76501-default-rtdb.firebaseio.com/${trimmedloginmail}/outbox.json`);
        let ans = await response.json();
        console.log(ans);
        if(ans){
        let mails = Object.values(ans);
        console.log(mails);
        setOutboxmail(mails);
        } 
    };
    outboxHandler();     
    },[]);


    

   
       
   
    return <>
       
        <div className={classes.od}>
    
        {
            outboxmail.map((item)=>{
                return <Row  >
                <Col xs={1}>{item.email}</Col>
                <Col>{item.subject}</Col>
                <hr/>
                </Row>
            })
        }
        </div>
       
    </>
}
export default Outbox;