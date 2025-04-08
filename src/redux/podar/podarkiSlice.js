import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchDesserts = createAsyncThunk(
    'podar/fetchDesserts', // уникалдуу аталыш
    async () => {
        const response = await fetch('https://67d824489d5e3a10152d94c8.mockapi.io/podarki');
        if (!response.ok) {
            throw new Error('Маалымат алууда ката кетти');
        }
        const data = await response.json();
        return data;
    }
);

const podarkiSlice = createSlice({
    name: 'podar', // бул жерде да уникалдуу аты болушу керек
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

export default podarkiSlice.reducer;
