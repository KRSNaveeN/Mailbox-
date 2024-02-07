import classes from './Mail.module.css';
import MyRichTextEditor from '../Editor';
import { useState,useRef } from 'react';
import { useSelector } from 'react-redux';
import Navbar from './Navbar';
   

const Mail = ()=>{

    

   
       
    // let outboxHandler = async ()=>{
    //     let response  = await fetch(`https://mailbox-76501-default-rtdb.firebaseio.com/sent/${trimmedloginmail}.json`);
    //     let ans = await response.json();
    //     console.log(ans);
    // }
    return <>
       
        <div>
        {/* <button onClick={inboxHandler}>Inbox</button>
        <button onClick={outboxHandler}>Outbox</button> */}
        </div>
       
    </>
}
export default Mail;