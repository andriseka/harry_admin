import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instanceapi from '../instanceapi';

const initialState = {
    konstituen : [],
    pagination: []
}

export const getKonstituen = createAsyncThunk('konstituen/getKonstituen', async(page) => {
    try {
        const response = await instanceapi.get(`/konstituen?page=${page}`).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

export const getDetailKonstituen = createAsyncThunk('konstituen/getDetailKonstituen', async(code) => {
    try {
        const response = await instanceapi.get(`/konstituen/detail/${code}`).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

export const getByRelawan = createAsyncThunk('konstituen/getByRelawan', async(relawan_username) => {
    try {
        const response = await instanceapi.get(`/konstituen/relawan/${relawan_username}`).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

export const postKonstiten = createAsyncThunk('konstituen/postKonstituen', async(data) => {
    try {
        const response = await instanceapi.post('/konstituen/store', data).catch((err) => {});
        return response.data
    } catch (error) {
        
    }
})

export const updateKonstituen = createAsyncThunk('konstituen/updateKonstituen', async(data) => {
    try {
        const response = await instanceapi.post(`/konstituen/update`, data).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

export const deleteKonstituen = createAsyncThunk('konstituen/deleteKonstituen', async(id) => {
    try {
        const response = await instanceapi.delete(`/konstituen/delete/${id}`).catch((err) => {});
        return response.data
    } catch (error) {
        
    }
})

const konstituenSlice = createSlice({
    name: 'konstituen',
    initialState,
    extraReducers: (builder) => {
        // get data
        builder.addCase(getKonstituen.fulfilled, (state, action) => {
            state.konstituen = action.payload.data;
            state.pagination = action.payload.pagination
        })
    }
})

export default konstituenSlice.reducer;