import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: "feed",
    initialState: null,
    reducers: {
        setFeed: (state, action) => action.payload,
        clearFeed: (state) => null,
    }
});

export const {setFeed, clearFeed} = feedSlice.actions;
export default feedSlice.reducer;