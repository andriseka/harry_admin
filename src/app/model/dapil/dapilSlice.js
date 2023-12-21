import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instanceapi from '../instanceapi';

const initialState = {
    dapil: [],
}

export const getDapil = createAsyncThunk('dapil/getDapil', async() => {
    try {
        const response = await instanceapi.get('/dapil').catch((err) => {});
        return response.data.data;
    } catch (error) {
        
    }
})

export const postDapil = createAsyncThunk('dapil/postDapil', async(data) => {
    try {
        const response = await instanceapi.post('/dapil/store', data).catch((err) => {});
        return response.data
    } catch (error) {

    }
})

const dapilSlice = createSlice({
    name: 'dapil',
    initialState,
    extraReducers: (builder) => {
        // get
        builder.addCase(getDapil.fulfilled, (state, action) => {
            state.dapil = action.payload.map((i) => ({value: i.kecamatan_id, label: i.kecamatan}))
        })
    }
})

export default dapilSlice.reducer;