import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Асинхрондук аракет: fetch менен APIдан маалымат алуу
export const fetchDesserts = createAsyncThunk(
    'aksys/fetchDesserts',
    async () => {
        const response = await fetch('https://67d824499d5e3a10152d94d1.mockapi.io/Nurzada/dsert');
        if (!response.ok) {
            throw new Error('Маалымат алууда ката кетти');
        }
        const data = await response.json();
        return data; // JSON форматында келген маалыматты кайтарып беребиз
    }
);

const aksySlice = createSlice({
    name: 'aksys',
    initialState: {
        desserts: [], // APIдан келген десерттер сакталат
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDesserts.pending, (state) => {
                state.loading = true; // Жүктөө башталды
            })
            .addCase(fetchDesserts.fulfilled, (state, action) => {
                state.loading = false;
                state.desserts = action.payload; // APIдан келген маалыматты сактоо
            })
            .addCase(fetchDesserts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message; // Ката болсо аны сактоо
            });
    },
});

export default aksySlice.reducer;
