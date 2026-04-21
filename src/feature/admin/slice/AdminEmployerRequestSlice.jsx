import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAllEmployerRequests,
  approveEmployer,
} from "../service/AdminService";

// FETCH ALL EMPLOYERS
export const fetchEmployerRequests = createAsyncThunk(
  "admin/fetchEmployerRequests",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getAllEmployerRequests();
      return res.data;
    } catch (err) {
      return rejectWithValue("Failed to fetch employer requests");
    }
  }
);

// APPROVE EMPLOYER
export const approveEmployerRequest = createAsyncThunk(
  "admin/approveEmployerRequest",
  async (id, { rejectWithValue }) => {
    try {
      await approveEmployer(id);
      return id;
    } catch (err) {
      return rejectWithValue("Approve failed");
    }
  }
);

const employerSlice = createSlice({
  name: "employerRequests",
  initialState: {
    employers: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // FETCH
      .addCase(fetchEmployerRequests.pending, (state) => {
        state.loading = true;
        state.error = null; 
      })
      .addCase(fetchEmployerRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.employers = action.payload;
        state.error = null; 
      })
      .addCase(fetchEmployerRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // APPROVE
      .addCase(approveEmployerRequest.fulfilled, (state, action) => {
        state.employers = state.employers.filter(
          (e) => e.employerId !== action.payload
        );
      });
  },
});

export default employerSlice.reducer;