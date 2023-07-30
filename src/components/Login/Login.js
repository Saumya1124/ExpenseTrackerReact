import { Fragment, useRef, useState } from 'react';
import './Login.css';

import { Form , Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Login = ()=>{

    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    const history = useHistory()

    const submitHandler = (event) => {

        event.preventDefault()
        
        const email = emailInputRef.current.value;
        const password = passwordInputRef.current.value;

        const res = fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDQxLmt-BOKxFBdkG6zrMXfQL2YwbzHBb8',
        {
            method : 'POST',
            body : JSON.stringify({
                email : email,
                password : password,
                returnSecureToken : true,
            }),
            headers : {
                'Content-Type':'application/JSON'
            }
        })

        res.then(res => {

            if(res.ok){
                
                return res.json().then(data => {
                    console.log(data)
                    history.replace('/expense')

                })
            }

            else{
                return res.json().then(data =>{
                    let errorMessage = 'Authentication failed!'
                    alert (errorMessage)
                })
            }
        })



    }

    return (
        <Fragment>
            <div className='d-flex justify-content-center align-items-center form'>
                <div className='col-lg-3 form1'>
                    <div className='d-flex justify-content-center'>
                        <h3>LogIn</h3>
                    </div>

                    <br />
                    
                    <Form onSubmit={submitHandler}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email"  required ref={emailInputRef} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" required ref={passwordInputRef} />
                        </Form.Group>
                        <div className='d-flex justify-content-center '>
                            <button className='btn'>LogIn</button>
                        </div>                        
                    </Form>

                    <br />

                    <div className='d-flex justify-content-center'>
                        <Link to='/signUp'>Don't have an account? Sign Up</Link>
                         
                    </div>
                </div>
            </div>

        </Fragment>
    )
}
export default Login