import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instanceapi from "../instanceapi";

const initialState = {
    slider : []
}

export const getSlider = createAsyncThunk('slider/getSlider', async() => {
    try {
        const response = await instanceapi.get('/slider').catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
});

export const postSlider = createAsyncThunk('slider/postSlider', async(data) => {
    try {
        const response = await instanceapi.post('/slider/store', data).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

export const deleteSlider = createAsyncThunk('slider/deleteSlider', async(id) => {
    try {
        const response = await instanceapi.delete(`/slider/delete/${id}`).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

const sliderSlice = createSlice({
    name: 'slider',
    initialState,
    extraReducers: (builder) => {
        // get data
        builder.addCase(getSlider.fulfilled, (state, action) => {
            state.slider = action.payload.data;
        })
    }
})

export default sliderSlice.reducer;