import { Fragment, useContext } from "react";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import { Redirect, Route , Switch} from 'react-router-dom';
import Expense from "./components/Expenses/Expense";
import UpdateProfile from "./components/Profile/UpdateProfile";
import AuthContext, { AuthContextProvider } from "./Context/authContext";
import ResetLogin from "./components/Login/ResetLogin";
import { useSelector } from "react-redux";


const App = () => {

  const ctx = useContext(AuthContext)

  const isAuth = useSelector(state => state.auth.isLogged)

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
              {!isAuth && <Login></Login>}
        </Route>

        <Route path="/expense">
              {/* {ctx.isLoggedIn ? <Expense></Expense> : <Redirect to='/login' />}               */}
              {isAuth ? <Expense></Expense> : <Redirect to='/login' />}
        </Route>

        <Route path="/updateProfile">
              <UpdateProfile></UpdateProfile>
        </Route>

        <Route path="/reset">
               <ResetLogin></ResetLogin>
        </Route>

      </Switch>

    </AuthContextProvider>
  
      
  )
}

export default App