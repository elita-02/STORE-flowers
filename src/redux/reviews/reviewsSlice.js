import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchReviews = createAsyncThunk(
  'reviews/fetchReviews',
  async () => {
    const response = await fetch('https://6805e938ca467c15be6a59d3.mockapi.io/Juma/otzyv');
    if (!response.ok) throw new Error('Ошибка сервера');
    const data = await response.json();

    return data.map(item => ({
      id: item.id,
      title: item.title || 'Без названия',
      price: item.price,
      image: item.image,
      discount: item.discount,
      category: item.category,
      description: item.description || '',
      createdAt: item.createdAt || new Date().toISOString(),
    }));
  }
);

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default reviewsSlice.reducer;
