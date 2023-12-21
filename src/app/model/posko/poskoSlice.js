import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instanceapi from "../instanceapi";

const initialState = {

}

export const getPosko = createAsyncThunk('posko/getPosko', async() => {
    try {
        const response = await instanceapi.get('/posko').catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

export const postPosko = createAsyncThunk('posko/postPosko', async(data) => {
    try {
        const response = await instanceapi.post('/posko/store', data).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

const poskoSlice = createSlice({
    name: 'posko',
    initialState,
})

export default poskoSlice.reducer;