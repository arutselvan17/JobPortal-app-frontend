import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllUsers, updateUserStatus } from "../service/AdminService";

export const fetchAllUsers = createAsyncThunk(
  "adminUsers/fetchAllUsers",
  async ({ page = 0, size = 10 }, { rejectWithValue }) => {
    try {
      const response = await getAllUsers(page, size);
      // console.log(response.data)
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed");
    }
  }
);

export const changeUserStatus = createAsyncThunk(
  "admin/changeUserStatus",
  async ({ userId, status }, { rejectWithValue }) => {
    try {
      await updateUserStatus(userId, status);
      return { userId, status };
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

const adminUserSlice = createSlice({
  name: "adminUsers",
  initialState: {
    users: [],
    loading: false,
    totalPages: 0,
    currentPage: 0,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        console.log(action)
        state.loading = false;
        state.users = action.payload.content;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.number;
      })

      .addCase(fetchAllUsers.rejected, (state) => {
        state.loading = false;
      })

      .addCase(changeUserStatus.fulfilled, (state, action) => {
        const user = state.users.find(
          (u) => u.userId === action.payload.userId
        );

        if (user) user.status = action.payload.status;
      });
  },
});

export default adminUserSlice.reducer;