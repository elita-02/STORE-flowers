import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "../../axios/apiClient"; // API чакыруу

export const getCategory = createAsyncThunk(
    "getcategory/fetch", 
    async ({ cake, text }, thunkAPI) => {
        let url = "Nurzada/Flowers";  // Баштапкы URL
        
        if (cake) {  // Категория болсо
            url = `/Nurzada/Flowers?category=${cake}`;
        } else if (text) {  // Эгерде текст болсо
            url = `/Nurzada/Flowers?title=${text}`;
        }
        
        try {
            const res = await apiClient.get(url);  // API'ден маалымат алуу
            console.log("API response:", res.data);  // Жоопту консольго чыгарыңыз
            return res.data;
        } catch (error) {
            console.error("API error:", error.message);  // Ката болсо, консольго чыгарыңыз
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const categorySlice = createSlice({
    name: "category",
    initialState: {
        category: [],  // Категориялардын жыйынтыгы
        loading: false, // Жүктөө абалы
        error: null,    // Ката абалы
        cake: "",       // Категория
        search: "",     // Издөө текст
    },
    reducers: {
        changeState: (state, action) => {
            state.cake = action.payload;  // Категория тандаганда
            state.category = [];  // Башка жыйынтыктарды тазалоо
            state.search = "";
        },
        setSearch: (state, action) => {
            state.search = action.payload;  // Тексттик издөөнү түзөтүү
            state.cake = "";
            state.category = [];
        },
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
    },
});

export const { changeState, setSearch } = categorySlice.actions;
export default categorySlice.reducer;
