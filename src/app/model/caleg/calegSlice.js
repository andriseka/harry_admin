import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instanceapi from "../instanceapi";

const initialState = {
    loading : false,
    status: false,
    message: []
}

export const getCaleg = createAsyncThunk('caleg/getCaleg', async() => {
    try {
        const response = await instanceapi.get('/caleg').catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

export const postCaleg = createAsyncThunk('caleg/postCaleg', async(data) => {
    try {
        const response = await instanceapi.post('/caleg/store', data).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
});

export const updateCaleg = createAsyncThunk('caleg/updateCaleg', async(data) => {
    try {
        const response = await instanceapi.post('/caleg/update', data).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

const calegSlice = createSlice({
    name: 'caleg',
    initialState,
    extraReducers: (builder) => {
        // get
        builder.addCase(getCaleg.fulfilled, (state, action) => {
            if (action.payload.status === 200) {
                localStorage.setItem('caleg', JSON.stringify(action.payload.data));
            }
        })

        // post
        builder.addCase(postCaleg.pending, (state) => {
            state.loading = true;
        })
        .addCase(postCaleg.fulfilled, (state, action) => {
            state.loading = false;
            state.status = action.payload.status;
            if (action.payload.status === 400) {
                state.message = action.payload.message
            }
            if (action.payload.status === 201) {
                localStorage.setItem('caleg', JSON.stringify(action.payload.data));
            }
        })

        // update
        builder.addCase(updateCaleg.pending, (state) => {
            state.loading = true;
        })
        .addCase(updateCaleg.fulfilled, (state, action) => {
            state.loading = false;
            state.status = action.payload.status;
            if (action.payload.status === 400) {
                state.message = action.payload.message
            }
            if (action.payload.status === 200) {
                localStorage.setItem('caleg', JSON.stringify(action.payload.data));
            }
        })
    }
});

export default calegSlice.reducer;