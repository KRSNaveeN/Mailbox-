import classes from './Outbox.module.css';
import { useState,useEffect} from 'react';
import { Row,Col, Button } from 'react-bootstrap';
import { useSelector,useDispatch } from 'react-redux';
import { authActions } from '../../Store/auth';
import { useNavigate } from 'react-router-dom';
   

const Outbox = ()=>{

    let [outboxmail,  setOutboxmail] = useState([]);
    let [names,setNames] = useState([]);
    // const loginEmail = useSelector(state => state.email);
    let loginemail = localStorage.getItem("logged");
    const trimmedloginmail = loginemail.replace("@gmail.com", "");
    let dispatch = useDispatch();
    let navigate = useNavigate();
    let token = useSelector(state=>state.token);
    let [update,setUpdate] = useState(true);

    let outboxHandler = async ()=>{
        let response  = await fetch(`https://mailbox-76501-default-rtdb.firebaseio.com/${trimmedloginmail}/outbox.json`);
        let ans = await response.json();
        console.log(ans);
        if(ans){
        let mails = Object.values(ans);
        let naames = Object.keys(ans);
        setNames(naames);
        setOutboxmail(mails);
        dispatch(authActions.inboxmail(mails));
        } 
    };

    useEffect(()=>{
      outboxHandler();     
    },[update,token]);

    
  let deleteHandler = async (item)=>{    
    let index = outboxmail.findIndex((eachitem) => eachitem.id == item.id);
    let x = names[index];
  try{
    let  response = await fetch(`https://mailbox-76501-default-rtdb.firebaseio.com/${trimmedloginmail}/outbox/${x}.json`,{
        method : "PATCH",
        body : JSON.stringify({delete : true, read : true})
    });
    let data = await response.json();
    }
    catch(err){
    console.log(err);
    }
    setUpdate((pre)=>!pre); 
   };

  let MailopenHandler = (item)=>{
     console.log("opended sent mail");
     navigate(`/outbox/${item.id}`)
  };
   
       
   
    return <>
       
        <div className={classes.od}>
    
        {
            outboxmail.map((item)=>{
                return <div className={classes.og}>
                 {!item.delete && <Row  >
                    <Col xs={11} onClick={()=>MailopenHandler(item)}>
                    <Row>
                       <Col xs={1}>{item.receiver}</Col>
                        <Col>{item.subject}</Col>
                    </Row>
                    </Col>
                <Col xs={1}><Button variant="danger" onClick={()=>deleteHandler(item)}>Delete</Button></Col>
                
                <hr/>
                </Row>
                }
                </div>
                
            })
        }
        </div>
       
    </>
}
export default Outbox;