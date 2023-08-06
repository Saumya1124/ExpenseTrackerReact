import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import './Expense.css'
import AuthContext from "../../Context/authContext";
import { Form , Table} from "react-bootstrap";
import axios from "axios";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { expenseActions } from "../../store/ExpenseSlice";
import { themeAction } from "../../store/ThemeSlice";
import { saveAs } from 'file-saver';
import { authActions } from "../../store/AuthSlice";



const Expense = ()=>{

    const amountInputRef = useRef();
    const descriptionInputRef = useRef();
    const categoryInputRef = useRef();

    const [isLoading , setIsLoading] = useState(false);

    const [expenses , setExpenses] = useState([]);

    const [passExpense , setPassExpense] = useState([]);

    const [isEditing , setIsEditing] = useState(false);

    const [isLen , setIsLen] = useState(false)

    const history = useHistory();

    const ctx = useContext(AuthContext);

    const auth = useSelector(state => state.auth)

    const email = (auth.email).split('@')

    const userEmail = email[0]

    const expenseData = useSelector(state => state.expense)

    const dispatch = useDispatch()

    var totalExpenseAmount = 0

    const [isPremium , setIsPremium] = useState(false)

    const theme = useSelector(state => state.theme.theme)
    


    // User LogOut

    const logOutHandler = () => {
        // ctx.logOut()
        dispatch(authActions.logOut({id : '',email:''}))
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

    
    // Adding Expense Data

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

        setExpenses([data,...expenses])


        const postData = axios.post(`https://expensetrackerreact-242ac-default-rtdb.firebaseio.com/${userEmail}.json`,{
            amount : amount,
            description : description,
            category : category
        })

        postData.then(res => {
            if(res.statusText == 'OK'){
                console.log('Expense Added Successfully')

                setExpenses([...expenses,data])

                amountInputRef.current.value = '';
                descriptionInputRef.current.value = '';
                categoryInputRef.current.value = '' ;
            }
            
        })
        .catch( (err) => {console.log(err)})


    }

    // Get all expenses from firebase

    useEffect ( () => {

        const getData = axios.get(`https://expensetrackerreact-242ac-default-rtdb.firebaseio.com/${userEmail}.json`)

        getData.then(res =>{

            if(res.statusText == 'OK'){ 

                setExpenses(Object.values(res.data))

                setPassExpense(res.data)
                setIsLen(true)

                dispatch(expenseActions.addExpense(expenses))
                
                
               
            }
            
        })
        .catch((err)=>{console.log(err)})

    
    },[expenses , passExpense] )


    // Edit an existing expense

    const editHandler = (key) => {

        localStorage.setItem('keyToEdit' , key)

        setIsEditing(true)

        const editData = axios.get(`https://expensetrackerreact-242ac-default-rtdb.firebaseio.com/${userEmail}/${key}.json`)

        editData.then( (res) => {

            if(res.statusText = 'OK'){

                amountInputRef.current.value = res.data.amount ; 
                descriptionInputRef.current.value = res.data.description ;
                categoryInputRef.current.value = res.data.category ;

            }
            else{
                console.log('error')
            }


        })

    }

    const updateEditHandler = (event)=> {

        event.preventDefault()

        const key = localStorage.getItem('keyToEdit')

        const updatedExpense = {
            amount : amountInputRef.current.value,
            description : descriptionInputRef.current.value,
            category : categoryInputRef.current.value
        }

        const updateData = axios.put(`https://expensetrackerreact-242ac-default-rtdb.firebaseio.com/${userEmail}/${key}.json`,updatedExpense)

        updateData.then((res)=>{
            
            console.log('Updated Successfully')
            amountInputRef.current.value = '';
            descriptionInputRef.current.value = '';
            categoryInputRef.current.value = '';

            localStorage.removeItem('keyToEdit')
        })
        .catch((error)=>{
            console.log(error)
        })

    }

    // Deleting an existing expense

    const deleteHandler = (key) => {

        const deleteData = axios.delete(`https://expensetrackerreact-242ac-default-rtdb.firebaseio.com/${userEmail}/${key}.json`)

        deleteData.then(res => {

            if(res.statusText === 'OK'){
                console.log('Deleted Successfully')
                const updateExpense = { ...passExpense };
                delete updateExpense[key];
                setPassExpense(updateExpense);
            }
            else{
                console.log('error')
            }
        })
        
    } 


    useEffect(()=>{

        expenseData.expenses.map( data => {
            totalExpenseAmount = totalExpenseAmount + Number(data.amount)
        })
    
        if (totalExpenseAmount > 10000){
            setIsPremium(true)
        }
        else{
            setIsPremium(false)
        }
    },[expenseData.expenses])

    // Theme Toggler 

    const themeToggler = () => {
        dispatch(themeAction.themeChanger())
    }


    const expenseDownloader = (event) => {

        event.preventDefault()

        const csv = "Category,Description,Amount\n" + Object.values(passExpense).map( ({category,description,amount}) => `${category},${description},${amount}`).join('\n')

        const blob = new Blob([csv],{type : 'text/csv'})

        saveAs(blob , expenses.csv)

    }
    

    return(
        <Fragment>
            <div className={theme ? 'dark' : 'light'}>
              <br />
              <div className="d-flex head">
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

              <div className="hr"></div>

              {isPremium && 
                    <div className="d-flex justify-content-end">
                        <Button className='m-2' variant="secondary" onClick={themeToggler}>Change Theme</Button>
                    </div>
              }
              
              <div className="d-flex justify-content-end verifyBtn">
                   <button onClick={verificationHandler}>Verify E-mail</button>
                   <button onClick={logOutHandler}>Log Out</button>
              </div>

              <div className="d-flex justify-content-center">
                   <div className="col-lg-5">
                        <Form >
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
                                {/* <div className='d-flex justify-content-center addExpense'>
                                    <button>Add Expense</button>
                                </div>        */}
                                {!isEditing && (
                                    <Button variant="info" type="submit" className="mt-3" onClick={submitHandler}>
                                        Add Expense
                                    </Button>
                                    )}
                                    {isEditing && (
                                    <Button variant="info" type="submit" className="mt-3" onClick={updateEditHandler}>
                                        Update Expense
                                    </Button>
                                )}                 
                        </Form>
                   </div>
              </div>

              <br />
              <br />

              <div>
                   <Table striped bordered hover variant="light" className="container">
                        <thead>
                        <tr>
                            <th>Sr.No.</th>
                            <th>Amount</th>
                            <th>Description</th>
                            <th>Category</th>
                            <th>Edit / Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        
                        { Object.keys(passExpense).map((key,index)=>(
                            <tr key={key}>
                                <td>{index + 1}</td>
                                <td>${passExpense[key].amount}</td>
                                <td>{passExpense[key].description}</td>
                                <td>{passExpense[key].category}</td>
                                <td><Button variant = 'secondary' onClick={() => editHandler(key)}>Edit</Button>
                                    <Button variant='secondary' onClick={ () => deleteHandler(key)}>Delete</Button>
                                </td>
                               
                            </tr>
                        )) }
                        </tbody>
                    </Table>

                    {isPremium && 
                        <div className="d-flex justify-content-center">
                            <Button variant="info" className="m-1">Activate Premium</Button>
                            <Button variant="info" onClick={expenseDownloader} className="m-1">Download Expenses</Button>
                        </div>}
              </div>

              <br />
              <br />

              </div>

        </Fragment>
    )
}
export default Expense