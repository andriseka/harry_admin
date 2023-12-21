import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instanceapi from "../instanceapi";

const initialState = {
    program : [],
    pagination: []
}

export const getProgram = createAsyncThunk('program/getProgram', async(data) => {
    try {
        const response = await instanceapi.get(`/program/validasi/${data.validasi}?page=${data.page}`).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

export const getProgramPosting = createAsyncThunk('program/getProgramPosting', async(page) => {
    try {
        const response = await instanceapi.get(`/program/posting?page=${page}`).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

export const getProgramDetail = createAsyncThunk('program/getProgramDetail', async(code) => {
    try {
        const response = await instanceapi(`/program/detail/${code}`).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

export const postProgram = createAsyncThunk('program/postProgram', async(data) => {
    try {
        const response = await instanceapi.post('/program/store', data).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

export const updateValidasiProgram = createAsyncThunk('program/updateValidasiProgram', async(data) => {
    try {
        const response = await instanceapi.post(`/program/validasi`, data).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

export const postValidasiLaporan = createAsyncThunk('program/postValidasiLaporan', async(data) => {
    try {
        const response = await instanceapi.post(`/program/laporan/${data.code}`, data).catch((err) => {});
        return response;
    } catch (error) {
        
    }
})

const programSlice = createSlice({
    name: 'program',
    initialState,
    extraReducers: (builder) => {
        // get data
        builder.addCase(getProgram.fulfilled, (state, action) => {
            state.program = action.payload.data;
            state.pagination = action.payload.pagination
        })
    }
})

export default programSlice.reducer;