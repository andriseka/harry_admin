import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instanceapi from "../instanceapi";

const initialState = {

}

export const postPengumuman = createAsyncThunk('pengumuman/postPengumuman', async(data) => {
    try {
        const response = await instanceapi.post('/pengumuman/store', data).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

const pengumumanSlice = createSlice({
    name: 'pengumuman',
    initialState,
    extraReducers: (builder) => {

    }
})

export default pengumumanSlice.reducer;