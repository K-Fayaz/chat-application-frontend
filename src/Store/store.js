import { configureStore } from "@reduxjs/toolkit";
import userDetails from "../Features/userDetails";
import messageDetails from "../Features/messages";

const Store = configureStore({
    reducer: {
        userDetails: userDetails,
        messageDetails: messageDetails
    }
});

export default Store;