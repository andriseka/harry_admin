import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instanceapi from '../instanceapi'

const initialState = {
    relawan: [],
    pagination: []
}

export const getRelawan = createAsyncThunk('relawan/getRelawan', async(page) => {
    try {
        const response = await instanceapi.get(`/relawan?page=${page}`).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

export const getByGradeRelawan = createAsyncThunk('relawan/getByGradeRelawan', async(data) => {
    try {
        const response = await instanceapi.get(`/relawan/grade/${data.grade}?page=${data.page}`).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

export const getDetailRelawan = createAsyncThunk('relawan/getDetailRelawan', async(relawan_username) => {
    try {
        const response = await instanceapi.get(`/relawan/detail/${relawan_username}`).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

export const getExceptUsernameRelawan = createAsyncThunk('relawan/getExceptUsernameRelawan', async(data) => {
    try {
        const response = await instanceapi.get('/relawan/except', {
            params: {
                username: data.username,
                name: data.name,
                page: data.page
            }
        }).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

export const moveRelawan = createAsyncThunk('relawan/moveRelawan', async(data) => {
    try {
        const response = await instanceapi.post('/relawan/move', data).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

export const searchNameRelawan = createAsyncThunk('relawan/searchNameRelawan', async(data) => {
    try {
        const response = await instanceapi.get(`/relawan/search/${data.name}?page=${data.page}`).catch((err) => {})
        return response.data;
    } catch (error) {
        
    }
})

export const getRelawanByJabatan = createAsyncThunk('relawan/getRelawanByJabatan', async(data) => {
    try {
        const response = await instanceapi.get(`/relawan/jabatan/${data.jabatan}?page=${data.page}`).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

export const postRelawan = createAsyncThunk('relawan/postRelawan', async(data) => {
    try {
        const response = await instanceapi.post('/relawan/store', data).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

export const updateDataRelawan = createAsyncThunk('relawan/updateDataRelawan', async(data) => {
    try {
        const response = await instanceapi.post(`/relawan/update/${data.username}`, data).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

const relawanSlice = createSlice({
    name: 'relawan',
    initialState,
    extraReducers: (builder) => {
        // get data
        builder.addCase(getRelawan.fulfilled, (state, action) => {
            state.relawan = action.payload.data;
            state.pagination = action.payload.pagination
        })

        // get grade
        builder.addCase(getByGradeRelawan.fulfilled, (state, action) => {
            state.relawan = action.payload.data;
            state.pagination = action.payload.pagination
        })
    }
})

export default relawanSlice.reducer;