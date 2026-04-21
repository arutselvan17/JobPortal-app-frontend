import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllJob } from "../service/AdminService";
import { createSlice } from "@reduxjs/toolkit";

export const fetchAllJobs = createAsyncThunk(
  "jobs/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getAllJob();
      return res.data; // your array
    } catch (err) {
      return rejectWithValue(
        err.response?.data || "Failed to fetch jobs"
      );
    }
  }
);

const initialState = {
  jobs: [],
  loading: false,
  error: null,
};

const adminJobSlice = createSlice({
  name: "alljobs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload;
      })
      .addCase(fetchAllJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default adminJobSlice.reducer;