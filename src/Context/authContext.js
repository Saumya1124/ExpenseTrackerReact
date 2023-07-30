import React , {useState} from "react";

const AuthContext = React.createContext({
    token : '',
    isLoggedIn : false,
    email : '',
    logIn : (token) => {},
    logOut : () => {}
});

export const AuthContextProvider = (props) => {

    const [email , setEmail] = useState('');

    const initialToken = localStorage.getItem('token');

    const [token , setToken] = useState(initialToken);

    

    const userIsLoggedIn = !!token ;

    const logInHandler = (email,token) => {
        setToken(token)
        setEmail(email)
        

        localStorage.setItem('token', token)
        localStorage.setItem('email', email)
        
    }

    const logOutHandler = () => {
        setToken(null)
        localStorage.removeItem('token')
        localStorage.removeItem('email')
    }
    
    // setTimeout(logOutHandler , 15000)
   

    const contextValue = {
        token : token ,
        isLoggedIn : userIsLoggedIn,
        email : email,
        logIn : logInHandler,
        logOut : logOutHandler

    }


    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>

}

export default AuthContext