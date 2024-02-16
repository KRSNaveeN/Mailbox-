import { useEffect,useState } from "react";
import {  useDispatch, useSelector } from "react-redux";
import classes from './Inbox.module.css';
import { Button, Col,Row } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../../Store/auth";

let Inbox = ()=>{
    let loginemail = localStorage.getItem("logged");
    let [names,setNames] = useState([]);
    let trimmedloginmail = loginemail.replace("@gmail.com", "");
    let dispatch = useDispatch();
    let navigate = useNavigate();
    let allmail = useSelector(state=>state.allmail);
    let toggle = useSelector(state=> state.toggle);
    let token = useSelector(state=>state.token);
    let [update,setUpdate] = useState(true);

    let Fetchingdata = async () => {
        console.log(trimmedloginmail);
        try {
            const response = await fetch(`https://mailbox-76501-default-rtdb.firebaseio.com/${trimmedloginmail}/inbox.json`);
             if (!response.ok) {throw new Error('Failed to fetch data')}
             console.log(response);
            const data = await response.json();
            console.log(data);
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
         console.log("inside fetching");
    }, [token,update]);

    let MailopenHandler = async (item)=>{
        let index = allmail.findIndex((eachitem) => eachitem.id == item.id);
        let x = names[index];
         let  response = await fetch(`https://mailbox-76501-default-rtdb.firebaseio.com/${trimmedloginmail}/inbox/${x}.json`,{
            method : "PATCH",
            body : JSON.stringify({read : true})});
       setUpdate((pre)=>!pre);
       dispatch(authActions.toggle());
         navigate(`/inbox/${item.id}`); }

    let deleteHandler = async (item)=>{  
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
          
            allmail.map((item)=>{    
            return <div key={Math.random()}>
                
              {!item.delete &&  <Row> 
                    <Col ><div style={{marginTop:"7px"}} className={item.read ? classes.read : classes.round}></div></Col>
                    <Col xs={10} onClick={()=>MailopenHandler(item)}>
                        <Row>
                       <Col xs={2}>{item.sender}:</Col>
                        <Col xs={10}><p>{item.subject}</p></Col>
                        </Row>
                   </Col>

                    <Col xs={1}><Button variant="danger"  onClick={()=>deleteHandler(item)}>Delete</Button></Col>
                    <hr/>
                </Row>}
               
            </div>

        })
       }
    </div>
};
export default Inbox;