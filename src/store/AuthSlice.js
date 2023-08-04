import { createSlice} from '@reduxjs/toolkit';


const initialAuthState = { token : '' , email : '' ,isLogged : false }

const authSlice = createSlice({
    name : 'auth',
    initialState : initialAuthState,
    reducers : {
        login(state,action){
            state.isLogged = true
            state.token = action.payload.id
            state.email = action.payload.email
        },
        logOut(state,action){
            state.isLogged = false
            state.token = action.payload.id
            state.email = action.payload.email

        }
    }
})

export const authActions = authSlice.actions;

export default authSlice.reducer;