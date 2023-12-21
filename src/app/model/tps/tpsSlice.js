import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instanceapi from "../instanceapi";

const initialState = {
    tps: [],
    pagination: []
}

export const getTps = createAsyncThunk('tps/getTps', async(page) => {
    try {
        const response = await instanceapi.get('/dapil/tps?page='+page).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

export const filterTps = createAsyncThunk('tps/filterTps', async(data) => {
    try {
        const response = await instanceapi.get('/dapil/tps/filter/'+data.code+'?page='+data.page).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

export const getTpsByCode = createAsyncThunk('tps/getTpsByCode', async(code) => {
    try {
        const response = await instanceapi.get('/dapil/tps/code/'+code).catch((err) => {});
        return response.data.data;
    } catch (error) {
        
    }
})

const tpsSlice = createSlice({
    name: 'tps',
    initialState,
    extraReducers: (builder) => {
        // get
        builder.addCase(getTps.fulfilled, (state, action) => {
            state.tps = action.payload.data;
            state.pagination = action.payload.pagination;
        })

        // get by code
        builder.addCase(getTpsByCode.fulfilled, (state, action) => {
            state.tps = action.payload.map((i) => ({ value: i.id, label: i.tps }))
        })

        // filter
        builder.addCase(filterTps.fulfilled, (state, action) => {
            state.tps = action.payload.data;
            state.pagination = action.payload.pagination;
        })
    }
});

export default tpsSlice.reducer;