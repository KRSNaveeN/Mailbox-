
import {configureStore, createSlice} from '@reduxjs/toolkit';

let logindata = {
    login : true,
    token : null,
    email : '',
    allmail : [],
    receivedmail : [],
    count : 0,
    toggle : true
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
        },
        allmail(state, action){
            state.allmail = action.payload;
        },
        inboxmail(state,action){
            state.receivedmail = action.payload;
        },
        count(state,action){
            state.count = action.payload;
        },
        toggle(state){
            state.toggle = !state.toggle;
        }
    }
})



let store = configureStore({
    reducer : loginslice.reducer
});
export const authActions = loginslice.actions;
export default store;