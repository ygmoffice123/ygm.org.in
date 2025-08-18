// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   isAuthenticated: false,
//   admin: null,
//   loading: false,
// };

// const adminSlice = createSlice({
//   name: 'admin',
//   initialState,
//   reducers: {
//     loginStart(state) {
//       state.loading = true;
//     },
//     loginSuccess(state, action) {
//       state.loading = false;
//       state.isAuthenticated = true;
//       state.admin = action.payload;
//     },
//     loginFailure(state) {
//       state.loading = false;
//       state.isAuthenticated = false;
//       state.admin = null;
//     },
//     logout(state) {
//       state.isAuthenticated = false;
//       state.admin = null;
//     },
//   },
// });

// export const { loginStart, loginSuccess, loginFailure, logout } = adminSlice.actions;

// export default adminSlice.reducer;



// utils/redux/slices/adminSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios.js";

export const fetchAdmin = createAsyncThunk(
  "admin/fetchAdmin",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/admin/get-admin", { withCredentials: true });
      return res.data?.data; // backend se admin object
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Not authenticated");
    }
  }
);


// inside adminSlice file

export const logoutAdmin = createAsyncThunk(
  "admin/logoutAdmin",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/admin/logout-admin ", {}, { withCredentials: true });
      return res.data?.message || "Logged out successfully";
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Logout failed");
    }
  }
);


const initialState = {
  isAuthenticated: false,
  admin: null,
  loading: false,
  error: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.admin = action.payload;
      state.error = null;
    },
    loginFailure(state) {
      state.loading = false;
      state.isAuthenticated = false;
      state.admin = null;
      state.error = "Login failed";
    },
    logout(state) {
      state.isAuthenticated = false;
      state.admin = null;
      state.error = null;
    },
  },
extraReducers: (builder) => {
  builder
    .addCase(fetchAdmin.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchAdmin.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.admin = action.payload;
      state.error = null;
    })
    .addCase(fetchAdmin.rejected, (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.admin = null;
      state.error = action.payload;
    })
    // ✅ logout handle
    .addCase(logoutAdmin.pending, (state) => {
      state.loading = true;
    })
    .addCase(logoutAdmin.fulfilled, (state) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.admin = null;
      state.error = null;
    })
    .addCase(logoutAdmin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
}

});

export const { loginStart, loginSuccess, loginFailure, logout } = adminSlice.actions;
export default adminSlice.reducer;
