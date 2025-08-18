import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios.js";

const initialState = {
  data: [],
  loading: false,
  error: null,
  currentPage: 0,
  limit: 6,
  totalCount: 0, // total feedbacks in backend
};

// ✅ Fetch feedbacks with pagination
export const fetchFeedbacks = createAsyncThunk(
  "feedback/fetchFeedbacks",
  async (_, { getState, rejectWithValue }) => {
    // console.log("hello");
    
    try {
      const { currentPage, limit } = getState().feedback;
      const res = await axiosInstance.get(`/feedback/fetch-feedbacks/${currentPage}/${limit}`);
      console.log(res.data.data);
      
      return res.data.data || { feedbacks: [], totalCount: 0 }; // expecting backend returns { feedbacks, totalCount }
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to fetch feedbacks");
    }
  }
);

// ✅ Add feedback
export const addFeedback = createAsyncThunk(
  "feedback/addFeedback",
  async (feedbackData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/feedback/add-feedback", feedbackData);
      return res.data.data; 
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to add feedback");
    }
  }
);

// ✅ Update feedback
export const updateFeedback = createAsyncThunk(
  "feedback/updateFeedback",
  async ({ id, feedbackData }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.put(`/feedback/edit-feedback/${id}`, feedbackData);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to update feedback");
    }
  }
);

// ✅ Delete feedback
export const deleteFeedback = createAsyncThunk(
  "feedback/deleteFeedback",
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/feedback/delete-feedback/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to delete feedback");
    }
  }
);

const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {
    resetFeedbackPagination: (state) => {
      state.data = [];
      state.currentPage = 0;
      state.totalCount = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch feedbacks
      .addCase(fetchFeedbacks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeedbacks.fulfilled, (state, action) => {
        state.loading = false;
        const { feedbacks, totalCount } = action.payload;
        if (feedbacks?.length > 0) {
          state.data = [...state.data, ...feedbacks];
          state.currentPage += 1;
        }
        state.totalCount = totalCount;
      })
      .addCase(fetchFeedbacks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add feedback
      .addCase(addFeedback.fulfilled, (state, action) => {
        console.log(action.payload);
        
        state.data.unshift(action.payload); // add new feedback at top
        state.totalCount += 1;
      })
      .addCase(addFeedback.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Update feedback
      .addCase(updateFeedback.fulfilled, (state, action) => {
        const index = state.data.findIndex(f => f._id === action.payload._id);
        if (index !== -1) state.data[index] = action.payload;
      })
      .addCase(updateFeedback.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Delete feedback
      .addCase(deleteFeedback.fulfilled, (state, action) => {
        state.data = state.data.filter(f => f._id !== action.payload);
        state.totalCount -= 1;
      })
      .addCase(deleteFeedback.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { resetFeedbackPagination } = feedbackSlice.actions;
export default feedbackSlice.reducer;



