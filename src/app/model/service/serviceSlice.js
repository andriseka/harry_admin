import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instanceapi from '../instanceapi'

const initialState = {

}

export const getService = createAsyncThunk('service/getService', async(page) => {
    try {
        const response = await instanceapi.get(`/service?page=${page}`).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

export const storeService = createAsyncThunk('service/storeService', async(data) => {
    try {
        const response = await instanceapi.post('/service/store', data).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

export const getDetailService = createAsyncThunk('service/getDetailService', async(id) => {
    try {
        const response = await instanceapi.get(`/service/detail/${id}`).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
});

export const getServiceByRelawan = createAsyncThunk('service/getServiceByRelawan', async(data) => {
    try {
        const response = await instanceapi.get(`/service/relawan/${data.relawan_id}?page=${data.page}`).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})


export const getServiceCategoryAll = createAsyncThunk('service/getServiceCategoryAll', async() => {
    try {
        const response = await instanceapi.get('/service/category/all').catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
});


const serviceSlice = createSlice({
    name: 'service',
    initialState,

})

export default serviceSlice.reducer;