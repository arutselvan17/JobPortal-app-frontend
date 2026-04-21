import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllCategory,
  postCategory,
  deleteCategory,
} from "../service/AdminService";
import { editeCategory } from "../service/AdminService";

// FETCH
export const fetchCategories = createAsyncThunk(
  "category/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getAllCategory();
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || "Failed to fetch categories",
      );
    }
  },
);

// CREATE
export const createCategory = createAsyncThunk(
  "category/createCategory",
  async (newCategory, { rejectWithValue }) => {
    try {
      const res = await postCategory(newCategory);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to create category");
    }
  },
);

// DELETE
export const deleteCategoryById = createAsyncThunk(
  "category/deleteCategoryById",
  async (id, { rejectWithValue }) => {
    try {
      await deleteCategory(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Delete failed");
    }
  },
);

export const updateCategoryById = createAsyncThunk(
  "category/updateCategoryById",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      await editeCategory(id, data);
      return { id, data };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Update failed");
    }
  },
);
const initialState = {
  categories: [],
  loading: false,
  error: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories.push(action.payload);
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteCategoryById.fulfilled, (state, action) => {
        state.categories = state.categories.filter(
          (cat) => cat.id !== action.payload,
        );
      })

      .addCase(updateCategoryById.fulfilled, (state, action) => {
        const { id, data } = action.payload;

        const category = state.categories.find((cat) => cat.id === id);

        if (category) {
          category.name = data.name;
        }
      });
  },
});

export default categorySlice.reducer;
