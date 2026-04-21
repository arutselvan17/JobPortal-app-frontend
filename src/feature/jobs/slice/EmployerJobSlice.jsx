import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setSkillApi } from "../service/JobService";
import { postJob } from "../service/JobService";
import {
  getmyJobs,
  updateJobStatusApi,
  extendDeadlineApi,
} from "../service/JobService";

// FETCH
export const fetchMyJobs = createAsyncThunk(
  "employerJob/fetchMyJobs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getmyJobs();
      return response.data;
    } catch (err) {
      // console.log(err)
      return rejectWithValue(err.response?.data.message || "Error fetching jobs");
    }
  },
);

//post job
export const createJob = createAsyncThunk(
  "employerJob/createJob",
  async (jobData, { rejectWithValue }) => {
    try {
      const response = await postJob(jobData);
      // console.log(response.data)
      return response.data;
    } catch (err) {
      // console.log(err?.response || "error")
      return rejectWithValue(err.response?.data.message  || err.data);
    }
  },
);

// STATUS UPDATE
export const updateJobStatus = createAsyncThunk(
  "employerJob/updateStatus",
  async ({ jobId, status }, { rejectWithValue }) => {
    try {
      await updateJobStatusApi(jobId, status);
      return { jobId, status };
    } catch (err) {
      // console.log(err)
     return rejectWithValue(err.response?.data.message || err.data);
    }
  },
);

// EXTEND DEADLINE
export const extendDeadline = createAsyncThunk(
  "employerJob/extendDeadline",
  async ({ jobId, deadLine }, { rejectWithValue }) => {
    try {
      await extendDeadlineApi(jobId, deadLine);
      return { jobId, deadLine };
    } catch (err) {
      // console.log(err)
     return rejectWithValue(err.response?.data.message || err.data);
    }
  },
);

export const setSkill = createAsyncThunk(
  "job/setSkill",
  async ({ jobId, skills }, { rejectWithValue }) => {
    try {
      const res = await setSkillApi(jobId, skills);
      return res.data;
    } catch (err) {
      // console.log(err)
      return rejectWithValue(err.response?.data.message || err.data);
    }
  }
);



const initialState = {
  jobs: [],
  loading: false,
  error: null,
};

const EmployerJobSlice = createSlice({
  name: "employerJob",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchMyJobs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload;
      })
      .addCase(fetchMyJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE STATUS
      .addCase(updateJobStatus.fulfilled, (state, action) => {
        const job = state.jobs.find((j) => j.jobId === action.payload.jobId);
        if (job) job.status = action.payload.status;
      })

      // EXTEND DEADLINE
      .addCase(extendDeadline.fulfilled, (state, action) => {
        const job = state.jobs.find((j) => j.jobId === action.payload.jobId);
        if (job) job.deadLine = action.payload.deadLine;
      })

      // CREATE JOB
      .addCase(createJob.pending, (state) => {
        state.loading = true;
      })
      .addCase(createJob.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs.push(action.payload);
      })
      .addCase(createJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

       .addCase(setSkill.pending, (state) => {
        state.loading = true;
      })
      .addCase(setSkill.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(setSkill.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default EmployerJobSlice.reducer;
