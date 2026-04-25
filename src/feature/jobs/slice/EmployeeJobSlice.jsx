import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getSavedJob } from "../service/JobService";
import { setSaved } from "../service/JobService";

export const fetchSavedJob = createAsyncThunk(
    "employeeJob/fetchSavedJob",
    async(_,{rejectWithValue}) =>{

        try{
            const res = await getSavedJob();
            return res.data;
        }
        catch(error){
            return rejectWithValue(error?.response.data.message || "faild to Load")
        }

    }
    
)

export const saveJob = createAsyncThunk(
    "employeeJob/saveJob",
    async(JobId , {rejectWithValue}) =>{
        try{
            const res = await setSaved(JobId);
            return res.data;
        }
        catch(error){
            return rejectWithValue(error?.response?.data?.message || "Faild to Load")
        }
    }
)

const initialState = {
    savedJobs:[],
    loading : false,
    error : null
}
const savedjobSlice = createSlice({
    name: "employeeJob",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchSavedJob.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchSavedJob.fulfilled, (state, action) => {
            state.savedJobs = action.payload;
            state.loading = false;
        })
        .addCase(fetchSavedJob.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        })
        .addCase(saveJob.fulfilled, (state, action) => {
            state.savedJobs = action.payload;
        })
        .addCase(saveJob.rejected, (state, action) => { 
            state.error = action.payload;
        })
    }
})

export const { clearError } = savedjobSlice.actions  
export default savedjobSlice.reducer