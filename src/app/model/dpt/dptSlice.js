import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instanceapi from "../instanceapi";

const initialState = {
    dpt: [],
    pagination : []
}

export const getDpt = createAsyncThunk('dpt/getDpt', async(page) => {
    try {
        const response = await instanceapi.get(`/dpt?page=${page}`).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

export const getDptByStatus = createAsyncThunk('dpt/getDptByStatus', async(data) => {
    try {
        const response = await instanceapi.get('/dpt/status', {
            params: {
                code: data.code,
                name: data.name,
                page: data.page
            }
        }).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

export const getDptFilter = createAsyncThunk('dpt/getDptFilter', async(data) => {
    try {
        const response = await instanceapi.get('/dpt/filter', {
            params: {
                code : data.code,
                name: data.name,
                page: data.page
            }
        }).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
});

export const getDptSearchName = createAsyncThunk('dpt/getDptSearchName', async(data) => {
    try {
        const response = await instanceapi.get(`/dpt/search/${data.name}?page=${data.page}`).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

export const getDptDetail = createAsyncThunk('dpt/getDptDetail', async(id) => {
    try {
        const response = await instanceapi.get(`/dpt/detail/${id}`).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

export const postDpt = createAsyncThunk('dpt/postDpt', async(data) => {
    try {
        const response = await instanceapi.post('/dpt/store', data).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

export const getDptFilterBantuan = createAsyncThunk('dpt/getDptFilterBantuan', async(data) => {
    try {
        const response = await instanceapi.get('/dpt/filter/bantuan', {
            params: {
                code : data.code,
                name: data.name,
                page: data.page
            }
        }).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

const dptSlice = createSlice({
    name: 'dpt',
    initialState,
    extraReducers: (builder) => {
        // get data
        builder.addCase(getDpt.fulfilled, (state, action) => {
            state.dpt = action.payload.data;
            state.pagination = action.payload.pagination;
        })

        // get by status
        builder.addCase(getDptByStatus.fulfilled, (state, action) => {
            state.dpt = action.payload.data;
            state.pagination = action.payload.pagination;
        })

        // get filter
        builder.addCase(getDptFilter.fulfilled, (state, action) => {
            state.dpt = action.payload.data;
            state.pagination = action.payload.pagination
        })

        // get search name
        builder.addCase(getDptSearchName.fulfilled, (state, action) => {
            state.dpt = action.payload.data;
            state.pagination = action.payload.pagination
        })
        
    }
})

export default dptSlice.reducer;