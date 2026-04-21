import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllApplications } from "../service/AdminService";
import { createSlice } from "@reduxjs/toolkit";

export const fetchAllApplications  = createAsyncThunk(
    "admin/fetchAllApplications",
    async(_,{rejectWithValue}) =>{
        try{
            const response = await getAllApplications();
            return response.data;
        }catch(error){
            return rejectWithValue(
                error.response.data || "Faild to Load"
            )
        }
    }
)

const initialState = {
  applications: [],
  loading: false,
  error: null,
};

const adminApplicationSlice = createSlice({
  name: "adminApplication",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllApplications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllApplications.fulfilled, (state, action) => {
        state.loading = false;
        state.applications = action.payload;
      })
      .addCase(fetchAllApplications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default adminApplicationSlice.reducer;

