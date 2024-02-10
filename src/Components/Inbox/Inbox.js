import { useEffect,useState } from "react";
import {  useDispatch, useSelector } from "react-redux";
import classes from './Inbox.module.css';
import { Button, Col,Row } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../../Store/auth";

let Inbox = ()=>{
  let loginemail =  useSelector(state =>state.email);
    
    let [names,setNames] = useState([]);
    let trimmedloginmail = loginemail.replace("@gmail.com", "");
    let dispatch = useDispatch();
    let allmail = useSelector(state=>state.allmail);
    let toggle = useSelector(state=> state.toggle);
    let token = useSelector(state=>state.token);
    let count = useSelector(state=>state.count);
    let [update,setUpdate] = useState(true);
    
    console.log("token is: ",toggle);


    let Fetchingdata = async () => {
        try {
            const response = await fetch(`https://mailbox-76501-default-rtdb.firebaseio.com/${trimmedloginmail}/inbox.json`);
             if (!response.ok) {throw new Error('Failed to fetch data')}
    
            const data = await response.json();
            let naames =  Object.keys(data);
        
            setNames(naames);
             let arr = Object.values(data);
             let total  = 0;
            arr.map((item)=>{
                if(item.read == false){
                    total++;
                }});

            dispatch(authActions.allmail(arr));
            dispatch(authActions.inboxmail(naames));
            dispatch(authActions.count(total));
        } catch (err) {
            console.error('Error fetching data:', err);
        }
    };
    
    useEffect(()=>{
         Fetchingdata();
    }, [token,update]);


    let navigate = useNavigate();


    let MailopenHandler = async (item)=>{
       
        let index = allmail.findIndex((eachitem) => eachitem.id == item.id);
    
        let x = names[index];
      
       
        let  response = await fetch(`https://mailbox-76501-default-rtdb.firebaseio.com/${trimmedloginmail}/inbox/${x}.json`,{
            method : "PATCH",
            body : JSON.stringify({read : true}),
        });
        
        
       setUpdate((pre)=>!pre);
       dispatch(authActions.toggle());
         navigate(`/inbox/${item.id}`);
       
    }

    let deleteHandler = async (item)=>{
       console.log("deleted");
         
       let index = allmail.findIndex((eachitem) => eachitem.id == item.id);
    
       let x = names[index];
     
      
       let  response = await fetch(`https://mailbox-76501-default-rtdb.firebaseio.com/${trimmedloginmail}/inbox/${x}.json`,{
           method : "PATCH",
           body : JSON.stringify({delete : true, read : true})
       });
       setUpdate((pre)=>!pre); 
       dispatch(authActions.toggle());

    }

    return<div className={classes.cont}>
       
       {
        // emails.map((item)=>{    
            allmail.map((item)=>{    
            return <div className={classes.inbox}>
                
              {!item.delete &&  <Row> 
                    <Col ><div className={item.read ? classes.read : classes.round}></div></Col>
                    <Col xs={10} onClick={()=>MailopenHandler(item)}>
                        <Row>
                       <Col xs={2}>{item.sender}:</Col>
                        <Col xs={10}><p>{item.subject}</p></Col>
                        </Row>
                   </Col>

                    <Col xs={1}><button  onClick={()=>deleteHandler(item)}>Delete</button></Col>
                </Row>}
            </div>
        })
       }
    </div>
};
export default Inbox;