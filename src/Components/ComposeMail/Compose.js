import MyRichTextEditor from '../Editor/Editor';
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classes from './Compose.module.css';
import { v4 as uuidv4 } from 'uuid';

const Compose = () => {
    const [email, setEmail] = useState('');
    const [maildata, setMaildata] = useState('');
    const subjectRef = useRef();

    const loginEmail = useSelector(state => state.email);
    const trimmedLoginEmail = loginEmail.replace("@gmail.com", "");

    const dispatch = useDispatch();

    const submitHandler = async (e) => {
        e.preventDefault();
        const trimmedEmail = email.replace("@gmail.com", "");
        const data = {
            email: trimmedEmail,
            subject: subjectRef.current.value,
            read: false,
            id: generateUniqueId(),
            sender: trimmedLoginEmail,
            body: maildata
        };

        try {
            const response = await fetch(`https://mailbox-76501-default-rtdb.firebaseio.com/${trimmedEmail}/inbox.json`, {
                method: "POST",
                body: JSON.stringify(data)
            });

            console.log(trimmedEmail, trimmedLoginEmail);
            const ans = await response.json();
            console.log(ans);

            const res = await fetch(`https://mailbox-76501-default-rtdb.firebaseio.com/${trimmedLoginEmail}/outbox.json`, {
                method: "POST",
                body: JSON.stringify(data)
            });
        } catch (err) {
            console.log(err);
        }
    };

    const generateUniqueId = () => {
        // Implement your unique ID generation logic here
        // Example: Use UUID library or Firebase's push ID generator
     


    return uuidv4(); // Generate a version 4 (random) UUID


    };

    return (
        <form onSubmit={submitHandler}>
            <div className={classes.og}>
                <div className="input-group">
                    <div className="input-group-text">To</div>
                    <input type="email" required placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" />
                    <div className="input-group-text">"Cc/Bc"</div>
                </div>
                <input type="text" placeholder='Subject' ref={subjectRef} className='form-control' />
            </div>

            <div className={classes.od}>
                <div className={classes.ed}>
                    <MyRichTextEditor collectdata={setMaildata} />
                </div>
                <button>Send</button>
            </div>
        </form>
    );
};

export default Compose;
