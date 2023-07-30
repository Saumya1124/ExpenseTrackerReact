import { Fragment, useContext, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import './Expense.css'
import AuthContext from "../../Context/authContext";
import { Form , Table} from "react-bootstrap";
import axios from "axios";



const Expense = ()=>{

    const amountInputRef = useRef();
    const descriptionInputRef = useRef();
    const categoryInputRef = useRef();

    const [isLoading , setIsLoading] = useState(false);

    const [expenses , setExpenses] = useState([]);

    const history = useHistory();

    const ctx = useContext(AuthContext);


    // User LogOut

    const logOutHandler = () => {
        ctx.logOut()
        history.replace('/login')

    }

    // User E-mail verification

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

    // Expense Form

    const submitHandler = (event) => {

        event.preventDefault()

        const amount = amountInputRef.current.value;
        const description = descriptionInputRef.current.value;
        const category = categoryInputRef.current.value;

        console.log(amount ,' ',description,' ',category)

        const data = {
            amount : amount,
            description : description,
            category : category
        }

        setExpenses([...expenses,data])

        console.log(expenses)

        const res = axios.post('https://expensetrackerreact-242ac-default-rtdb.firebaseio.com/expenses.json',{
            amount : amount,
            description : description,
            category : category
        })

        res.then(res => {
            if(res.statusText == 'OK'){
                console.log('Expense Added Successfully')
            }
            else{
                console.log('error')
            }
        })


    }

    const getData = axios.get('https://expensetrackerreact-242ac-default-rtdb.firebaseio.com/expenses.json')

    getData.then(res =>{

        if(res.statusText == 'OK'){            
            setExpenses(Object.values(res.data))
        }
        else{
            console.log('error')
        }
    })

    return(
        <Fragment>
              <br />
              <div className="d-flex ">
                    <div className="col-lg-6 col-md-6 col-12">
                        <h4 className="p-2">Welcome to Expense Tracker !!!</h4>
                    </div>
                    <div className="col-lg-6 col-md-5 col-12 d-flex justify-content-end">
                        <p className="para">Your profile is incomplete.
                            <Link to='/updateProfile' className='link1'> Complete Now</Link>
                        </p>
                    </div>
                    
              </div>
              
              <hr />
              <div className="d-flex justify-content-end verifyBtn">
                   <button onClick={verificationHandler}>Verify E-mail</button>
                   <button onClick={logOutHandler}>Log Out</button>
              </div>

              <div className="d-flex justify-content-center">
                   <div className="col-lg-5">
                        <Form onSubmit={submitHandler}>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Amount</Form.Label>
                                    <Form.Control type="text"  required ref={amountInputRef} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control type="text" required ref={descriptionInputRef} />
                                </Form.Group>
                                <Form.Select aria-label="Default select example" ref={categoryInputRef}>
                                    <option>Select expense type</option>
                                    <option value="Food">Food</option>
                                    <option value="Apartment">Apartment</option>
                                    <option value="Travel">Travel</option>
                                </Form.Select>
                                <br />
                                <div className='d-flex justify-content-center addExpense'>
                                    <button>Add Expense</button>
                                </div>                        
                        </Form>
                   </div>
              </div>

              <br />
              <br />

              <div>
                   <Table striped bordered hover variant="light" className="container">
                        <thead>
                        <tr>
                            <th>Amount</th>
                            <th>Description</th>
                            <th>Category</th>
                        </tr>
                        </thead>
                        <tbody>
                        {expenses.map((expense,index)=>(
                            <tr key={index}>
                                <td>${expense.amount}</td>
                                <td>{expense.description}</td>
                                <td>{expense.category}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
              </div>
        </Fragment>
    )
}
export default Expense