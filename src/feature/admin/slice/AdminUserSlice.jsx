import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllUsers } from "../service/AdminService";
import { updateUserStatus } from "../service/AdminService";

// 1. THUNK
export const fetchAllUsers = createAsyncThunk(
  "adminUsers/fetchAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllUsers();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch users");
    }
  },
);

// update user status
export const changeUserStatus = createAsyncThunk(
  "admin/changeUserStatus",
  async ({ userId, status }, { rejectWithValue }) => {
    try {
      await updateUserStatus(userId, status);
      return { userId, status }; // return for UI update
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update status");
    }
  },
);

// 2. SLICE
const adminUserSlice = createSlice({
  name: "adminUsers",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },

  reducers: {
    clearUsersState: (state) => {
      state.users = [];
      state.error = null;
      state.loading = false;
    },
  },

  extraReducers: (builder) => {
    builder
      // pending
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // success
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })

      // error
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(changeUserStatus.fulfilled, (state, action) => {
        const { userId, status } = action.payload;

        const user = state.users.find((u) => u.userId === userId);
        if (user) {
          user.status = status;
        }
      });
  },
});

export const { clearUsersState } = adminUserSlice.actions;

export default adminUserSlice.reducer;
