import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    messages:[],
};

const messageSlice = createSlice({
    name:'Messages',
    initialState: initialState,
    reducers:{
        setMessages: (state,action)=>{

        },
        updateMessage: (state,action)=>{

        },
        deleteMessage: (state,action)=>{

        }
    }
});


export default messageSlice.reducer;
export const {
    setMessages,
    updateMessage,
    deleteMessage
} = messageSlice.actions;