import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instanceapi from '../instanceapi';

const initialState = {
    financial : [],
    pagination : []
}

export const getFinancial = createAsyncThunk('financial/getFinancial', async(page) => {
    try {
        const response = await instanceapi.get(`/financial?page=${page}`).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
});

export const getFinancialBtStaus = createAsyncThunk('financial/getFinancialBtStaus', async(data) => {
    try {
        const response = await instanceapi.get(`/financial/status/${data.status}?page=${data.page}`).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

export const postFinancial = createAsyncThunk('financial/postFinancial', async(data) => {
    try {
        const response = await instanceapi.post('/financial/store', data).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

export const getDetailFinancial = createAsyncThunk('financial/getDetailFinancial', async(code) => {
    try {
        const response = await instanceapi.get(`/financial/detail/${code}`).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

export const getFinancialSaldo = createAsyncThunk('financial/getFinancialSaldo', async() => {
    try {
        const response = await instanceapi.get('/financial/saldo').catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

const financialSlice = createSlice({
    name: 'financial',
    initialState,
    extraReducers: (builder) => {
        // get data
        builder.addCase(getFinancial.fulfilled, (state, action) => {
            state.financial = action.payload.data;
            state.pagination = action.payload.pagination
        })
    }
})

export default financialSlice.reducer;