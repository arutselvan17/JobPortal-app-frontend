import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login } from "../service/AuthService";
import { jwtDecode } from "jwt-decode";
 

const token = localStorage.getItem("token");
const refreshToken = localStorage.getItem("refreshToken");

let email = null;
let userRole = null;


function isTokenExpired(token) {
  if (!token) return true;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
}

if (token) {
  try {
    const decoded = jwtDecode(token);
    email = decoded.sub;
    userRole = decoded.role;
  } catch (err) {
    console.error("Invalid token");
  }
}

const initialState = {
  isAuthenticated: !!token && !isTokenExpired(token),
  email: email,
  userRole: userRole,
  accessToken: token,
  refreshToken: refreshToken,
  error: null,
  loading: false,
};


  //  THUNK: LOGIN

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await login(credentials);

      console.log(response)

      const token = response.body.accessToken;
      const refreshToken = response.body.refreshToken;

      // Save tokens
      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);

      const decoded = jwtDecode(token);

      return {
        email: decoded.sub,
        userRole: decoded.role,
        accessToken: token,
        refreshToken: refreshToken,
      };
    } catch (error) {
      console.log(error)
      return rejectWithValue(
        error.response?.data?.message ||
        error.response?.data ||
        "Login failed"
      );
    }
  }
);


  //  SLICE

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.email = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.userRole = null;
      state.error = null;

      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
    },
  },
  extraReducers: (builder) => {
    builder

      //  PENDING
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      //  SUCCESS
      .addCase(loginUser.fulfilled, (state, action) => {
        state.email = action.payload.email;
        state.userRole = action.payload.userRole;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.isAuthenticated = true;
        state.loading = false;
      })

      //  FAILURE
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
         state.isAuthenticated = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;