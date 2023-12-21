import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instanceapi from '../instanceapi';

const initialState = {
    kecamatan : []
}

export const getKecamatan = createAsyncThunk('kecamatan/getKecamatan', async(kabupaten_id) => {
    try {
        const response = await instanceapi.get('/wilayah/kecamatan/'+kabupaten_id).catch((err) => {})
        return response.data.data;
    } catch (error) {
        
    }
})


const kecamatanSlice = createSlice({
    name: 'kecamatan',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getKecamatan.fulfilled, (state, action) => {
            state.kecamatan = action.payload.map((i) => ({ value: i.id, label: i.name }))
        })
    }
});

export default kecamatanSlice.reducer;