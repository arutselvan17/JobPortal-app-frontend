import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../service/AxiosInstance";

// API CALL
export const fetchEmployerStatus = createAsyncThunk(
  "employerStatus/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/status/employer");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error");
    }
  }
);

const employerStatusSlice = createSlice({
  name: "employerStatus",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployerStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEmployerStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchEmployerStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default employerStatusSlice.reducer;