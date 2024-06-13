import { createSlice, current } from "@reduxjs/toolkit";

const initialUserDetails = {
    allUsers:[],
    currentUser: null,
    loggedinUser: null
};


const userDetailsSlice = createSlice({
    name:'userDetails',
    initialState: initialUserDetails,
    reducers:{
        setAllUsers: (state,action)=>{
            state.allUsers = action.payload; // Details of all the users
        },
        setCurrentUser: (state,action)=>{
            state.currentUser = action.payload; // Id of the user I am currently chatting with
        },
        setLoggedinUser: (state,action)=>{
            state.loggedinUser = action.payload;
        }
    }
});


export default userDetailsSlice.reducer;

export const {
    setAllUsers,
    setCurrentUser,
    setLoggedinUser,
} = userDetailsSlice.actions;