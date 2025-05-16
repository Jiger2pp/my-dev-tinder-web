import { createSlice } from "@reduxjs/toolkit";

const pictureSlice = createSlice({
    name: "pictureUrl",
    initialState: "",
    reducers : {
        addPicture : (state, action) => action.payload ,
        removePicture : (state, action) => null
    }
    
});

export const {addPicture, removePicture} = pictureSlice.actions;
export default pictureSlice.reducer;