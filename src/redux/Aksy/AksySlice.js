import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchDesserts = createAsyncThunk(
    'aksys/fetchDesserts',
    async () => {
        const response = await fetch('https://67d824499d5e3a10152d94d1.mockapi.io/Nurzada/dsert');
        if (!response.ok) {
            throw new Error('error');
        }
        const data = await response.json();
        return data; 
    }
);

const aksySlice = createSlice({
    name: 'aksys',
    initialState: {
        desserts: [], 
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDesserts.pending, (state) => {
                state.loading = true; 
            })
            .addCase(fetchDesserts.fulfilled, (state, action) => {
                state.loading = false;
                state.desserts = action.payload; 
            })
            .addCase(fetchDesserts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message; 
            });
    },
});

export default aksySlice.reducer;
