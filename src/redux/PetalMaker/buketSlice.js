import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchBukets = createAsyncThunk(
  'buket/fetchBukets',
  async () => {
    const response = await fetch('https://67fd07103da09811b1746772.mockapi.io/buket');
    if (!response.ok) throw new Error('Ошибка сервера');
    const data = await response.json();
    
    return data.map(item => ({
      id: item.id,
      title: item.title || 'Без названия',
      price: item.price,
      image: item.image,
      discount: item.discount,
      category: item.category,
      description: item.description || ''
    }));
  }
);

const buketSlice = createSlice({
  name: 'buket',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBukets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBukets.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchBukets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default buketSlice.reducer;