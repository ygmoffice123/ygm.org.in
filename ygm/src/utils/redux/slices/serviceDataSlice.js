import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios";


const initialState = {
  data: [],
  loading: false,
  error: null,
};

// ✅ Fetch all services
export const fetchServices = createAsyncThunk(
  "services/fetchServices",
  async (_, { rejectWithValue }) => {
    console.log("run");
    
    try {
      const res = await axiosInstance.get("/services/fetch-service");
      console.log(res.data.data);
      
      return res.data?.data || [];
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to fetch services");
    }
  }
);

// ✅ Add a service
export const addService = createAsyncThunk(
  "services/addService",
  async (serviceData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/services/add-service", serviceData);
      return res.data?.data || {};
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to add service");
    }
  }
);

// ✅ Delete a service
export const deleteService = createAsyncThunk(
  "services/deleteService",
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/services/delete-service/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to delete service");
    }
  }
);

// ✅ Update a service
export const updateService = createAsyncThunk(
  "services/updateService",
  async ({ id, serviceData }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.put(`/services/edit-service/${id}`, serviceData);
      return res.data?.data || {};
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to update service");
    }
  }
);

const serviceSlice = createSlice({
  name: "services",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add
      .addCase(addService.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(addService.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteService.fulfilled, (state, action) => {
        state.data = state.data.filter((service) => service._id !== action.payload);
      })
      .addCase(deleteService.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Update
      .addCase(updateService.fulfilled, (state, action) => {
        const index = state.data.findIndex((service) => service._id === action.payload._id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(updateService.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default serviceSlice.reducer;
