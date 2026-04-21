import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { getJobApplication } from "../service/ApplicationService";
import { updateStatusOfApplication } from "../service/ApplicationService";

// get job applications

export const getJobApplications = createAsyncThunk(
  "employerApplication/getJobAPplications",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getJobApplication();
      console.log(res.data);
      return res.data;
    } catch (error) {
      return rejectWithValue("error in application loading");
    }
  },
);

export const updateApplicationStatus = createAsyncThunk(
  "employerApplication/updateApplicationStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const res = await updateStatusOfApplication(id, status);
      return { id, status }; // return minimal data
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error");
    }
  },
);
const initialState = {
  applications: [],
  error: null,
  loading: false,
};

const EmployerApplicationSlice = createSlice({
  name: "employerApplication",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getJobApplications.pending, (state) => {
        state.loading = true;
      })
      .addCase(getJobApplications.fulfilled, (state, action) => {
        state.applications = action.payload;
        state.loading = false;
      })
      .addCase(getJobApplications.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      .addCase(updateApplicationStatus.fulfilled, (state, action) => {
        const { id, status } = action.payload;

        const app = state.applications.find((a) => a.applicationId === id);

        if (app) {
          app.status = status; 
        }
      });
  },
});

export default EmployerApplicationSlice.reducer;
