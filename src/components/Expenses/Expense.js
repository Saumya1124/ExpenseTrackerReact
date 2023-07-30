import { Fragment } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import './Expense.css'

const Expense = ()=>{
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
        </Fragment>
    )
}
export default Expense