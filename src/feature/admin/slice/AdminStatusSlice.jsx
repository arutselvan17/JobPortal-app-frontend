import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../service/AxiosInstance";

export const fetchAdminStats = createAsyncThunk(
  "admin/fetchStats",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get("/status/admin");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Something went wrong"
      );
    }
  }
);

const AdminStatusSlice = createSlice({
  name: "admin",
  initialState: {
    stats: {
    totalEmployers: 0,
    totalEmployees: 0,
    totalJobs: 0,
    totalRequests: 0,
    totalHires: 0,
    totalBlockedAccounts: 0,
    totalCategories: 0,
  },
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminStats.pending, (state) => {
        state.loading = true;
        state.error = null; // important reset
      })
      .addCase(fetchAdminStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchAdminStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default AdminStatusSlice.reducer;