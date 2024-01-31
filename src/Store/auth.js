
import {configureStore, createSlice} from '@reduxjs/toolkit';

let logindata = {
    login : true
}

const loginslice = createSlice({
    name : "loginform",
    initialState : logindata,
    reducers : {
        log(state){
            state.login = !state.login
        }
    }
})



let store = configureStore({
    reducer : loginslice.reducer
});
export const authActions = loginslice.actions;
export default store;