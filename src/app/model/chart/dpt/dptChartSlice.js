import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instanceapi from '../../instanceapi';

const initialState = {

}

export const getTotalDpt = createAsyncThunk('dpt_chart/getTotalDpt', async() => {
    try {
        const response = await instanceapi.get('/dpt/total').catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

const dptChartSlice = createSlice({
    name: 'dpt_chart',
    initialState,
    extraReducers: (builder) => {

    }
});

export default dptChartSlice.reducer;