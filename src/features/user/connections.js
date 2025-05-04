import { createSlice } from "@reduxjs/toolkit";

const connections = createSlice({
    name: "connections",
    initialState: null,
    reducers: {
        setConnections: (state, action) => action.payload,
        clearConnections: (state) => null,

    }

});
export const { setConnections, clearConnections } = connections.actions;
export default connections.reducer;