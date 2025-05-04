import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/user/userSlice";
import feedSlice from "../features/user/feed/feedSlice";
import connectionsSlice from "../features/user/connections";
import receivedRequestsSlice from "../features/user/received/requests";

const store = configureStore ( {
    reducer: {
        user : userSlice,
        feed : feedSlice,
        connections: connectionsSlice,
        receivedRequests: receivedRequestsSlice
    }
});

export default store;
