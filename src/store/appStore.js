import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/user/userSlice";
import feedSlice from "../features/user/feed/feedSlice";
import connectionsSlice from "../features/user/connections";
import receivedRequestsSlice from "../features/user/received/requests";
import pictureSlice from "../features/user/picture"

const store = configureStore ( {
    reducer: {
        user : userSlice,
        feed : feedSlice,
        connections: connectionsSlice,
        receivedRequests: receivedRequestsSlice,
        pictureUrl: pictureSlice
    }
});

export default store;
