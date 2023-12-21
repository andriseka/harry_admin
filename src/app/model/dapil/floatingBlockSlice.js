import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instanceapi from "../instanceapi";

const initialState = {
    fb: [],
    pagination: []
}

export const getFb = createAsyncThunk('fb/getFb', async(page) => {
    try {
        const response = await instanceapi.get('/dapil/floating-block?page='+page).catch((err) => {});
        return response.data
    } catch (error) {
        
    }
})

const floatingBlockSlice = createSlice({
    name: 'fb',
    initialState,
    extraReducers: (builder) => {
        // get
        builder.addCase(getFb.fulfilled, (state, action) => {
            state.fb = action.payload.data;
            state.pagination = action.payload.pagination
        })
    }
});

export default floatingBlockSlice.reducer;