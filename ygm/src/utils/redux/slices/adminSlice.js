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

export const logoutAdmin = createAsyncThunk(
  "admin/logoutAdmin",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/admin/logout-admin", {});

      // ✅ remove token from localStorage
      localStorage.removeItem("accessToken");

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



// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axiosInstance from "../../axios.js";

// /* -------------------- ASYNC THUNKS -------------------- */

// // ✅ Login thunk
// export const loginAdmin = createAsyncThunk(
//   "admin/loginAdmin",
//   async ({ formData, navigate }, { rejectWithValue }) => {
//     try {
//       const res = await axiosInstance.post("/admin/login-admin", formData, {
//         withCredentials: true,
//       });

//       // token ko localStorage me save karo
//       if (res.data?.data?.token) {
//         localStorage.setItem("accessToken", res.data.data.token);
//       }

//       // redirect after login
//       if (navigate) navigate("/admin/clients");

//       return res.data?.data?.admin;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || "Login failed");
//     }
//   }
// );

// // ✅ Fetch Admin (for persistence check)
// export const fetchAdmin = createAsyncThunk(
//   "admin/fetchAdmin",
//   async (_, { rejectWithValue }) => {
//     try {
//       const res = await axiosInstance.get("/admin/get-admin", {
//         withCredentials: true,
//       });
//       return res.data?.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || "Not authenticated");
//     }
//   }
// );

// // ✅ Logout thunk
// export const logoutAdmin = createAsyncThunk(
//   "admin/logoutAdmin",
//   async (_, { rejectWithValue }) => {
//     try {
//       const res = await axiosInstance.post("/admin/logout-admin", {});

//       // remove token from localStorage
//       localStorage.removeItem("accessToken");

//       return res.data?.message || "Logged out successfully";
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || "Logout failed");
//     }
//   }
// );

// /* -------------------- SLICE -------------------- */

// const initialState = {
//   isAuthenticated: false,
//   admin: null,
//   loading: false,
//   error: null,
// };

// const adminSlice = createSlice({
//   name: "admin",
//   initialState,
//   reducers: {}, // ab manual reducers ki zarurat nahi
//   extraReducers: (builder) => {
//     builder
//       /* LOGIN */
//       .addCase(loginAdmin.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginAdmin.fulfilled, (state, action) => {
//         state.loading = false;
//         state.isAuthenticated = true;
//         state.admin = action.payload;
//         state.error = null;
//       })
//       .addCase(loginAdmin.rejected, (state, action) => {
//         state.loading = false;
//         state.isAuthenticated = false;
//         state.admin = null;
//         state.error = action.payload;
//       })

//       /* FETCH ADMIN */
//       .addCase(fetchAdmin.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchAdmin.fulfilled, (state, action) => {
//         state.loading = false;
//         state.isAuthenticated = true;
//         state.admin = action.payload;
//         state.error = null;
//       })
//       .addCase(fetchAdmin.rejected, (state, action) => {
//         state.loading = false;
//         state.isAuthenticated = false;
//         state.admin = null;
//         state.error = action.payload;
//       })

//       /* LOGOUT */
//       .addCase(logoutAdmin.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(logoutAdmin.fulfilled, (state) => {
//         state.loading = false;
//         state.isAuthenticated = false;
//         state.admin = null;
//         state.error = null;
//       })
//       .addCase(logoutAdmin.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export default adminSlice.reducer;
