import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instanceapi from '../instanceapi';

const initialState = {
    provinsi : []
}

export const getProvinsi = createAsyncThunk('provinsi/getProvinsi', async() => {
    try {
        const response = await instanceapi.get('/wilayah/provinsi').catch((err) => {})
        return response.data;
    } catch (error) {
        
    }
})

const provinsiSlice = createSlice({
    name: 'provinsi',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getProvinsi.fulfilled, (state, action) => {
            const provinsi = action.payload.data.map((i) => ({
                value: i.id,
                label: i.name
            }))
            localStorage.setItem('provinsi', JSON.stringify(provinsi))
        })
    }
});

export default provinsiSlice.reducer;