import { Fragment } from "react";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import { Redirect, Route , Switch} from 'react-router-dom';
import Expense from "./components/Expenses/Expense";
import UpdateProfile from "./components/Profile/UpdateProfile";
import AuthContext, { AuthContextProvider } from "./Context/authContext";


const App = () => {

  return (

    <AuthContextProvider>

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

        <Route path="/updateProfile">
              <UpdateProfile></UpdateProfile>
        </Route>

      </Switch>

    </AuthContextProvider>
  
      
  )
}

export default App