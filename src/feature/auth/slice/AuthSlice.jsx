import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login } from "../service/AuthService";
import { jwtDecode } from "jwt-decode";

/* ---------------------------------------------
   LOCAL STORAGE VALUES
--------------------------------------------- */
let token = localStorage.getItem("token");
let refreshToken = localStorage.getItem("refreshToken");

let email = null;
let userRole = null;

/* ---------------------------------------------
   CHECK TOKEN EXPIRY
--------------------------------------------- */
function isTokenExpired(token) {
  if (!token) return true;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
}

/* ---------------------------------------------
   REMOVE EXPIRED TOKEN ON APP LOAD
--------------------------------------------- */
if (token && isTokenExpired(token)) {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");

  token = null;
  refreshToken = null;
}

/* ---------------------------------------------
   DECODE VALID TOKEN
--------------------------------------------- */
if (token) {
  try {
    const decoded = jwtDecode(token);
    email = decoded.sub;
    userRole = decoded.role;
  } catch (err) {
    console.error("Invalid token");

    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");

    token = null;
    refreshToken = null;
  }
}

/* ---------------------------------------------
   INITIAL STATE
--------------------------------------------- */
const initialState = {
  isAuthenticated: !!token,
  email,
  userRole,
  accessToken: token,
  refreshToken,
  error: null,
  loading: false,
};

/* ---------------------------------------------
   LOGIN THUNK
--------------------------------------------- */
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await login(credentials);

      console.log("Login Response:", response);

      // Adjust according to backend response
      const accessToken =
        response.data?.body?.accessToken ||
        response.body?.accessToken ||
        response.data?.accessToken;

      const refreshToken =
        response.data?.body?.refreshToken ||
        response.body?.refreshToken ||
        response.data?.refreshToken;

      if (!accessToken || !refreshToken) {
        throw new Error("Token not found");
      }

      localStorage.setItem("token", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      const decoded = jwtDecode(accessToken);

      return {
        email: decoded.sub,
        userRole: decoded.role,
        accessToken,
        refreshToken,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data ||
          error.message ||
          "Login failed"
      );
    }
  }
);

/* ---------------------------------------------
   SLICE
--------------------------------------------- */
const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");

      state.isAuthenticated = false;
      state.email = null;
      state.userRole = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.error = null;
      state.loading = false;
    },
  },

  extraReducers: (builder) => {
    builder

      // LOGIN PENDING
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // LOGIN SUCCESS
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        state.isAuthenticated = true;
        state.email = action.payload.email;
        state.userRole = action.payload.userRole;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      })

      // LOGIN FAILED
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;