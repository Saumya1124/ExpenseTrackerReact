import { Fragment , useContext, useRef } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import './UpdateProfile.css'
import AuthContext from "../../Context/authContext";

const UpdateProfile = () => {

    const nameInputRef = useRef();
    const photoUrlInputRef = useRef();

    const ctx = useContext(AuthContext)

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDQxLmt-BOKxFBdkG6zrMXfQL2YwbzHBb8',
    {
        method: 'POST',
        body : JSON.stringify({
            idToken : ctx.token,
            returnSecureToken : true,
        }),
        headers : {
            'Content-Type' : 'application/json'
        }
    })
    .then(res => {
        if(res.ok){
            res.json().then(data => {
                console.log(data)
            })
        }
        else{
            console.log('error')
        }
    })

    const submitHandler = (event) => {

        event.preventDefault()

        const name = nameInputRef.current.value;
        const photo = photoUrlInputRef.current.value;

        console.log(name ,' ' , photo)

        const res = fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDQxLmt-BOKxFBdkG6zrMXfQL2YwbzHBb8',
        {
            method : 'POST',
            body : JSON.stringify({
                idToken: ctx.token,
                name : name,
                photo : photo,
                returnSecureToken: true,
            }),
            headers : {
                'Content-Type' : 'application/json'
            }
        })

        res.then(res => {

            if(res.ok){
                return res.json().then(data =>{
                    console.log('Updated Successfully')
                    console.log(data)
                })
            }
            else{
                return res.then(data =>{
                    let errorMessage = 'Updation Failed';
                    alert(errorMessage)
                    console.log(data)
                })
            }
        })


    }

    return (
        
        <Fragment>
              <br />
              <div className="d-flex ">
                    <div className="col-lg-6 col-md-6 col-12">
                        <h4 className="p-2">Winners never quit, Quitters never win !!!</h4>
                    </div>
                    <div className="col-lg-5 col-md-5 col-12 d-flex justify-content-end">
                        <p className="para">Your profile is <b>64%</b> completed. A complete profile has higher chances of landing a job.
                            <Link to='/updateProfile' className='link1'> Complete Now</Link>
                        </p>
                    </div>
                    
              </div>

              <hr />

              <br />

              <div className="d-flex justify-content-center">
                   
                    <div className="col-10 d-flex flex-wrap">

                         <div className="col-10 d-flex head">
                              <div className="col-6">
                                    <h3>Update Profile</h3>
                              </div>
                              <div className="col-6 d-flex justify-content-end">
                                    <button>Cancel</button>
                              </div>

                         </div>

                         
                         
                        <div className="col-10 d-flex">

                            <form className="col-12 d-flex flex-wrap" onSubmit={submitHandler}>

                            <div className="col-lg-6 col-12 d-flex name">
                                <i class="fa-brands fa-github"></i>
                                <p>Full Name : </p>
                                <input type="text"  ref={nameInputRef} required></input>
                            </div>

                            <div className="col-lg-6 col-12 d-flex name">
                                <i class="fa-solid fa-globe"></i>
                                <p>Profile Photo Url: </p>
                                <input type="text" ref={photoUrlInputRef} required></input>
                            </div>

                            <div className="col-10 d-flex btn">
                                <button >Update</button>
                            </div>

                            </form>

                        </div>

                         

                    </div>

                   

                    
              </div>

              <br />
              <br />

              <hr />

              
              
              
              
        </Fragment>

    )
}

export default UpdateProfile