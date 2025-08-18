import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios";

// ✅ Fetch all strengths
export const fetchStrengths = createAsyncThunk(
  "strength/fetchStrengths",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/strength/fetch-strength");
      return res.data?.data || [];
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to fetch strengths");
    }
  }
);

// ✅ Delete a strength
export const deleteStrength = createAsyncThunk(
  "strength/deleteStrength",
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/strength/delete-strength/${id}`);
      return id; // return deleted strength ID to remove from state
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to delete strength");
    }
  }
);

// ✅ Add a new strength
export const addStrength = createAsyncThunk(
  "strength/addStrength",
  async (strengthData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/strength/add-strength", strengthData);
      return res.data?.data; // assuming new strength object returned
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to add strength");
    }
  }
);

const strengthSlice = createSlice({
  name: "strength",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 📌 Fetch strengths
      .addCase(fetchStrengths.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStrengths.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchStrengths.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 📌 Delete strength
      .addCase(deleteStrength.fulfilled, (state, action) => {
        state.data = state.data.filter((strength) => strength._id !== action.payload);
      })
      .addCase(deleteStrength.rejected, (state, action) => {
        state.error = action.payload;
      })

      // 📌 Add strength
      .addCase(addStrength.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(addStrength.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default strengthSlice.reducer;
