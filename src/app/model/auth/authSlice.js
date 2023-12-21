import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instanceapi from "../instanceapi";

const initialState = {
    loading:false,
    status: '',
    error: ''
}

export const postLogin = createAsyncThunk('auth/postLogin', async(data, {rejectWithValue}) => {
    try {
        const response = await instanceapi.post('/auth/login', data).catch((err) => {
            return rejectWithValue(err.response)
        })
        if (response.data.status === 400) {
            return rejectWithValue(response.data)
        }
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const checkLogin = createAsyncThunk('auth/checkLogin', async(username) => {
    try {
        const response = await instanceapi.get('/auth/check/'+username).catch((err) => {
            console.log(err);
        })
        return response.data
    } catch (error) {
        console.log(error);
    }
})

export const postLogout = createAsyncThunk('auth/postLogout', async(username) => {
    try {
        const response = await instanceapi.post(`/auth/logout/${username}`).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: (builder) => {
        // post login
        builder.addCase(postLogin.pending, (state) => {
            state.loading = true;
        })
        .addCase(postLogin.fulfilled, (state, action) => {
            state.loading = false;
            state.status = action.payload.status;
            localStorage.setItem('user_data', JSON.stringify(action.payload.data));
        })
        .addCase(postLogin.rejected, (state, action) => {
            state.loading = false;
            state.status = action.payload.status;
            state.error = 'Periksa kembali username / password Anda'
        })

        // check login
        builder.addCase(checkLogin.pending,(state) => {
            state.loading = true;
        })
        .addCase(checkLogin.fulfilled, (state, action) => {
            state.loading = false;
            state.status = action.payload.status;
            if (action.payload.status === 200) {
                localStorage.setItem('user_data', JSON.stringify(action.payload.data))
            }
        })
    }
})

export default authSlice.reducer;