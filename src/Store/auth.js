
import {configureStore, createSlice} from '@reduxjs/toolkit';

let logindata = {
    login : true,
    token : null,
    email : ''
}

const loginslice = createSlice({
    name : "loginform",
    initialState : logindata,
    reducers : {
        log(state){
            state.login = !state.login
        },
        token(state,action){
            state.token = action.payload
        },
        mail(state,action){
            state.email = action.payload
        }
    }
})



let store = configureStore({
    reducer : loginslice.reducer
});
export const authActions = loginslice.actions;
export default store;