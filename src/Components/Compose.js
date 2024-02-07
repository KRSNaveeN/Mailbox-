import MyRichTextEditor from '../Editor';
import { useState,useRef } from 'react';
import { useSelector } from 'react-redux';
import classes from './Compose.module.css';
let Compose = ()=>{
    
    
    let [emaill, setEmail] = useState('');
    const trimmedEmail = emaill.replace("@gmail.com", "");
    let subject = useRef();



   let  loginemail = useSelector(state => state.email);
   let trimmedloginmail = loginemail.replace("@gmail.com", "");

   let submitHandler = async (e)=>{
        
    e.preventDefault();
    let data = {
        email : trimmedEmail,
        subject : subject.current.value
    };
    console.log(data);
    try{
    let response = await fetch(`https://mailbox-76501-default-rtdb.firebaseio.com/${trimmedEmail}.json`,{
        method : "POST",
        body : JSON.stringify(data)
    });
    let ans =  await response.json();
    console.log(ans);

    let res = await fetch(`https://mailbox-76501-default-rtdb.firebaseio.com/sent/${trimmedloginmail}.json`,{
        method : "POST",
        body : JSON.stringify(data)
    })
}
catch(err){
    console.log(err);
}
   }


    return<>
       <form onSubmit={submitHandler}>
            <div className={classes.og}>
            <div className="input-group">
                <div className="input-group-text">To</div>
                <input type="email" required placeholder='enter mail' value={emaill} onChange={(e)=>{setEmail(e.target.value)}} className="form-control"/>
                <div className="input-group-text">"Cc/Bc"</div>
            </div>
            <input type="text" placeholder='Subject' ref={subject} className='form-control'/>
            </div>
        
        <div className={classes.od}>
        {/* <textarea type="text" className={classes.ed} >Compose your mail</textarea> */}
        <div className={classes.ed}>
        <MyRichTextEditor/>
        </div>
        <button>Send</button>
        </div>
     </form>

    </>
};
export default Compose;