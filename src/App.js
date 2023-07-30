import { Fragment } from "react";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import { Redirect, Route , Switch} from 'react-router-dom';
import Expense from "./components/Expenses/Expense";


const App = () => {

  return (

      <Switch >

        <Route path="/" exact >
            <SignUp></SignUp>
        </Route>

        <Route path="/signUp" >
            <SignUp></SignUp>
        </Route>

        <Route path="/login">
              <Login></Login>
        </Route>

        <Route path="/expense">
              <Expense></Expense>
        </Route>

      </Switch>
  
      
  )
}

export default App