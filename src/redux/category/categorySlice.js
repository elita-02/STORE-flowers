import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "../../axios/apiClient";

export const getCategory = createAsyncThunk(
  "getcategory/fetch",
  async ({ cake, text, komu, occasion, color }, thunkAPI) => {
    let url = "Nurzada/Flowers";
    const params = [];

    if (cake) params.push(`category=${cake.replace(/\s/g, "")}`);
    if (text) params.push(`title=${text}`);
    if (komu) params.push(`komu=${komu}`);
    if (occasion) params.push(`povod=${occasion}`);
    if (color) params.push(`color=${color}`);

    if (params.length > 0) {
      url = `/Nurzada/Flowers?` + params.join("&");
    }

    try {
      const res = await apiClient.get(url);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState: {
    category: [],
    loading: false,
    error: null,
    cake: "",
    search: "",
    komu: "",
    occasion: "",
    color: ""
  },
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
      state.cake = "";
      state.category = [];
    },
    setKomu: (state, action) => {
      state.komu = action.payload;
      state.cake = "";
      state.category = [];
      state.search = "";
    },
    setOccasion: (state, action) => {
      state.occasion = action.payload;
      state.cake = "";
      state.category = [];
      state.search = "";
    },
    setColor: (state, action) => {
      state.color = action.payload;
      state.cake = "";
      state.category = [];
      state.search = "";
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.category = action.payload;
      })
      .addCase(getCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { setSearch, setKomu, setOccasion, setColor } = categorySlice.actions;
export default categorySlice.reducer;
