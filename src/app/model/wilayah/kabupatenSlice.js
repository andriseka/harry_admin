import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instanceapi from '../instanceapi'

const initialState = {
    kabupaten : []
}

export const getKabupaten = createAsyncThunk('kabupaten/getKabupaten', async(provinsi_id) => {
    try {
        const response = await instanceapi.get('/wilayah/kabupaten/'+provinsi_id).catch((err) => {})
        return response.data;
    } catch (error) {
        
    }
})

const kabupatenSlice = createSlice({
    name: 'kabupaten',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getKabupaten.fulfilled, (state, action) => {
            state.kabupaten = action.payload.data.map((i) => ({ value: i.id, label:i.name }))
        })
    }
});

export default kabupatenSlice.reducer;
