import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios";

// ✅ Fetch contact info
export const fetchContact = createAsyncThunk(
  "contact/fetchContact",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/contactInfo/get-contactInfo");
      return res.data?.data || {};
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to fetch contact info");
    }
  }
);

// ✅ Update contact info
export const updateContact = createAsyncThunk(
  "contact/updateContact",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.put(`/contactInfo/update-contactInfo/${id}`, updatedData);
      // console.log(res.data.data);
      
      return res.data?.data || res.data;  // Adjust based on your API response shape
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to update contact info");
    }
  }
);

const contactSlice = createSlice({
  name: "contact",
  initialState: {
    data: {},
    loading: false,
    error: null,
    updateLoading: false,
    updateError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 📌 Fetch contact
      .addCase(fetchContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContact.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 📌 Update contact
      .addCase(updateContact.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.data = action.payload;  // Replace with updated data
      })
      .addCase(updateContact.rejected, (state, action) => {
        state.updateLoading = false;
        state.updateError = action.payload;
      });
  },
});

export default contactSlice.reducer;
