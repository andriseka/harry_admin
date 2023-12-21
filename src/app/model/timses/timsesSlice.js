import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instanceapi from '../instanceapi';

const initialState = {
    timses: [],
    pagination: [],
}

export const getAllTimses = createAsyncThunk('timses/getAllTimses', async() => {
    try {
        const response = await instanceapi.get('/timses/all').catch((err) => {});
        return response.data.data;
    } catch (error) {
        
    }
})

export const getTimses = createAsyncThunk('timses/getTimses', async(page) => {
    try {
        const response = await instanceapi.get(`/timses?page=${page}`).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

export const getTimsesDetail = createAsyncThunk('timses/getTimsesDetail', async(timses) => {
    try {
        const response = await instanceapi.get(`/timses/detail/${timses}`).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

export const postTimses = createAsyncThunk('timses/postTimses', async(data) => {
    try {
        const response = await instanceapi.post('/timses/store', data).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

export const updateTimses = createAsyncThunk('timses/updateTimses', async(data) => {
    try {
        const response = await instanceapi.post(`/timses/update/${data.username}`, data).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

const timsesSlice = createSlice({
    name: 'timses',
    initialState,
    extraReducers: (builder) => {
        // get data
        builder.addCase(getTimses.fulfilled, (state, action) => {
            state.timses = action.payload.data;
            state.pagination = action.payload.pagination
        })
    }
})

export default timsesSlice.reducer;