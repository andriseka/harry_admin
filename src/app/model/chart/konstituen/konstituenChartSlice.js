import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instanceapi from '../../instanceapi';

const initialState = {

}

export const getTotalKonstituen = createAsyncThunk('konstituen_chart/getTotalKonstituen', async() => {
    try {
        const response = await instanceapi.get('/konstituen/total').catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

const konstituenChartSlice = createSlice({
    name: 'konstituen_chart',
    initialState,
    extraReducers: (builder) => {

    }
});

export default konstituenChartSlice.reducer;