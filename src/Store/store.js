import { configureStore } from "@reduxjs/toolkit";
import userDetails from "../Features/userDetails";

const Store = configureStore({
    reducer: {
        userDetails: userDetails
    }
});

export default Store;