import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/user/userSlice";
import feedSlice from "../features/user/feed/feedSlice";

const store = configureStore ( {
    reducer: {
        user : userSlice,
        feed : feedSlice
    }
});

export default store;
