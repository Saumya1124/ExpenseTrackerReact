import { Fragment, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import './ResetLogin.css';

const ResetLogin = () => {

    const emailInputRef = useRef();

    const [isLoading , setIsLoading] = useState(false)

    const submitHandler = (event) => {

        event.preventDefault()

        const email = emailInputRef.current.value;

        setIsLoading(true)

        const res = fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDQxLmt-BOKxFBdkG6zrMXfQL2YwbzHBb8',{
            method : 'POST',
            body : JSON.stringify({
                requestType : 'PASSWORD_RESET',
                email : email
            }),
            headers : {
                'Content-Type' : 'application/json'
            }
        })

        res.then(res => {

            setIsLoading(false)

            if(res.ok){

                return res.json().then(data => {
                    console.log('Reset password email sent')
                })
            }
            else{
                console.log('error')
            }
        })



    }


    return (
        <Fragment>
             <div className="d-flex justify-content-center align-items-center main">
                  <div className="col-lg-4 col-md-6 col-12 resetForm">
                       <h5 className="text-center">Enter an email with which you have registered.</h5>
                       <br />
                       <Form onSubmit={submitHandler}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email"  required ref={emailInputRef} />
                            </Form.Group>
                            <div className='d-flex justify-content-center resetBtn '>
                                {!isLoading ? <button >Send Link</button>: <p>Loading ...</p>}
                            </div> 
                       </Form>
                       <br />
                        <div className='d-flex justify-content-center'>
                            <Link to='/login' className='resetLink'>Have an account? LogIn</Link>                         
                        </div>
                  </div>
             </div>
        </Fragment>
    )
}
export default ResetLogin