import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instanceapi from '../instanceapi';

const initialState = {
    vb: [],
    pagination: []
}

export const getVb = createAsyncThunk('vb/getVb', async(page) => {
    try {
        const response = await instanceapi.get('/dapil/voting-block?page='+page).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

export const postVB = createAsyncThunk('vb/postVB', async(data) => {
    try {
        const response = await instanceapi.post('/dapil/voting-block/store', data).catch((err) => {})
        return response.data;
    } catch (error) {
        
    }
})

export const deleteVb = createAsyncThunk('vb/deleteVb', async(code) => {
    try {
        const response = await instanceapi.delete(`/dapil/voting-block/delete/${code}`).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

const votingBlockSlice = createSlice({
    name: 'vb',
    initialState,
    extraReducers: (builder) => {
        // get
        builder.addCase(getVb.fulfilled, (state, action) => {
            state.vb = action.payload.data;
            state.pagination = action.payload.pagination
        })
    }
})

export default votingBlockSlice.reducer;