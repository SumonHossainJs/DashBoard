import { createSlice, PayloadAction} from "@reduxjs/toolkit";


interface UserState {
    currentUser: any | null;
    loading : boolean;
    error: boolean;
    
}

const initialState : UserState = {
    currentUser: null,
    loading: false,
    error: false,
};


export const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        loginStart: (state) =>{
            state.loading = true;
        },
        loginSuccess:(state, action: PayloadAction<any>) =>{
            state.loading = false;
            state.currentUser = action.payload;
        },
        loginFailure:(state) =>{
            state.loading = false;
            state.error = true;
        },
        logout:(state) =>{
            state.currentUser = null;
            state.loading = false;
            state.error = false;
        } 
    }
});


export const { loginStart,loginFailure,loginSuccess,logout} = userSlice.actions;


export default userSlice.reducer;
