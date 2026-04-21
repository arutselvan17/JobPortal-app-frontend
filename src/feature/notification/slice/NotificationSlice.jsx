import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getTodayUnreadNotifications } from "../service/NotificationService";
import { markAsRead } from "../service/NotificationService";

export const fetchTodatUnreadNotification = createAsyncThunk(
  "notification/fetchTodatUnreadNotification",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getTodayUnreadNotifications();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message || "faild To get Notifications",
      );
    }
  },
);

export const ReadNotification = createAsyncThunk(
  "notification/ReadNotification",
  async (id, { rejectWithValue }) => {
    try {
      const response = await markAsRead(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message || "faild to change the reading status",
      );
    }
  },
);

const initialState = {
  notifications: [],
  error: null,
  loading: false,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodatUnreadNotification.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodatUnreadNotification.fulfilled, (state, action) => {
        state.notifications = action.payload;
        state.loading = false;
      })
      .addCase(fetchTodatUnreadNotification.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(ReadNotification.fulfilled, (state, action) => {
        const updated = action.payload;

        state.notifications = state.notifications.map((n) =>
          n.notificationId === updated.notificationId ? updated : n,
        );
      });
  },
});

export default notificationSlice.reducer;
