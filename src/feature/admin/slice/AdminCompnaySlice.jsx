import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllCompany, postCompany } from "../service/AdminService";

export const fetchAllCompany = createAsyncThunk(
  "admin/fetchAllCompany",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllCompany();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to load data");
    }
  }
);

//  NEW: thunk to post a new company
export const addCompany = createAsyncThunk(
  "admin/addCompany",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await postCompany(formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to post company");
    }
  }
);

const initialState = {
  companies: [],
  loading: false,
  error: null,
  posting: false,
  postError: null,
};

const adminCompanySlice = createSlice({
  name: "adminCompany",
  initialState,
  reducers: {
    clearCompany: (state) => {
      state.companies = [];
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchAllCompany
      .addCase(fetchAllCompany.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCompany.fulfilled, (state, action) => {
        state.loading = false;
        state.companies = action.payload;
      })
      .addCase(fetchAllCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // addCompany
      .addCase(addCompany.pending, (state) => {
        state.posting = true;
        state.postError = null;
      })
      .addCase(addCompany.fulfilled, (state, action) => {
        state.posting = false;
        state.companies.push(action.payload);
      })
      .addCase(addCompany.rejected, (state, action) => {
        state.posting = false;
        state.postError = action.payload;
      });
  },
});

export const { clearCompany } = adminCompanySlice.actions;
export default adminCompanySlice.reducer;