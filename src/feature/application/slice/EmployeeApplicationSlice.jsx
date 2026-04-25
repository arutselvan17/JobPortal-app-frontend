import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getMyApplications,
  applyforJob
} from "../service/ApplicationService";

export const fetchMyApplications = createAsyncThunk(
  "employeeApplication/fetchMyApplications",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getMyApplications();
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
        "Failed to load applications"
      );
    }
  }
);

export const applyForJob = createAsyncThunk(
  "employeeApplication/applyForJob",
  async (jobId, { rejectWithValue }) => {
    try {
      const res = await applyforJob(jobId);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
        "Failed to apply for job"
      );
    }
  }
);

const initialState = {
  applications: [],
  loading: false,
  error: null
};

const EmployeeApplicationSlice = createSlice({
  name: "employeeApplication",
  initialState,

  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },

  extraReducers: (builder) => {
    builder

      
      .addCase(fetchMyApplications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchMyApplications.fulfilled, (state, action) => {
        state.loading = false;
        state.applications = action.payload;
      })

      .addCase(fetchMyApplications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      
      .addCase(applyForJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(applyForJob.fulfilled, (state, action) => {
        state.loading = false;
        state.applications.push(action.payload);
      })

      .addCase(applyForJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearError } = EmployeeApplicationSlice.actions;

export default EmployeeApplicationSlice.reducer;