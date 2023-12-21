import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instanceapi from "../instanceapi";

const initialState = {
    desa: []
}

export const getDesa = createAsyncThunk('desa/getDesa', async(kecamatan_id) => {
    try {
        const response = await instanceapi.get('/wilayah/desa/'+kecamatan_id).catch((err) => {});
        return response.data.data;
    } catch (error) {
        
    }
});

const desaSlice = createSlice({
    name: 'desa',
    initialState,
    reducers : {
        clearDesa: (state) => {
            state.desa = []
        }
    },
    extraReducers: (builder) => {
        // get
        builder.addCase(getDesa.fulfilled, (state, action) => {
            state.desa = action.payload.map((i) => ({value: i.id, label: i.name}))
        })
    }
})

export default desaSlice.reducer;

export const { clearDesa } = desaSlice.actions;