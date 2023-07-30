import { Fragment, useContext } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import './Expense.css'
import AuthContext from "../../Context/authContext";

const Expense = ()=>{

    const ctx = useContext(AuthContext)

    const verificationHandler = (event)=> {

        event.preventDefault()
        const res = fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDQxLmt-BOKxFBdkG6zrMXfQL2YwbzHBb8',
        {
            method:'POST',
            body: JSON.stringify({
                requestType : 'VERIFY_EMAIL',
                idToken : ctx.token
            }),
            headers:{
                'Content-Type': 'application/json'
            }
        })

        res.then(res => {

            if(res.ok){
                return res.json().then(data => {
                    console.log('Verification mail send')
                })
            }
            else{
                
                    console.log('error')
            
            }
        })

    }

    return(
        <Fragment>
              <br />
              <div className="d-flex ">
                    <div className="col-lg-6 col-md-6 col-12">
                        <h4 className="p-2">Welcome to Expense Tracker !!!</h4>
                    </div>
                    <div className="col-lg-5 col-md-5 col-12 d-flex justify-content-end">
                        <p className="para">Your profile is incomplete.
                            <Link to='/updateProfile' className='link1'> Complete Now</Link>
                        </p>
                    </div>
                    
              </div>
              
              <hr />
              <div className="d-flex btn">
                   <button onClick={verificationHandler}>Verify E-mail</button>
              </div>
        </Fragment>
    )
}
export default Expense