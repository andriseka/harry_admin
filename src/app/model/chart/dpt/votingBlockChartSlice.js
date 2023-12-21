import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instanceapi from '../../instanceapi';

const initialState = {

}

export const getVotingTotal = createAsyncThunk('voting_chart', async() => {
    try {
        const response = await instanceapi.get('/dapil/voting-block/total/konstituen').catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
});

const votingBlockChartSlice = createSlice({
    name: 'voting_chart',
    initialState,
    extraReducers: (builder) => {

    }
})

export default votingBlockChartSlice.reducer;