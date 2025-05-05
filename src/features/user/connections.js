import { createSlice } from "@reduxjs/toolkit";

const connections = createSlice({
    name: "connections",
    initialState: null,
    reducers: {
        setConnections: (state, action) => action.payload,
        removeConnections: (state) => null,

    }

});
export const { setConnections, removeConnections } = connections.actions;
export default connections.reducer;