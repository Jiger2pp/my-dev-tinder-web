import { createSlice } from "@reduxjs/toolkit";

const receivedRequests = createSlice({
    name: "receivedRequests",
    initialState: null,
    reducers: {
        setReceivedRequests: (state, action) => {return action.payload },
        removeReceivedRequest: (state, action) => { return state.filter( (receivedRequest) => receivedRequest._id !== action.payload)},

    }

});
export const { setReceivedRequests, removeReceivedRequest } = receivedRequests.actions;
export default receivedRequests.reducer;