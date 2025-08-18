import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios";

const initialState = {
  data: [],
  loading: false,
  error: null,
  currentPage: 0,
  limit: 4,
  totalCount:0,
};

// ✅ Fetch all clients
export const fetchClients = createAsyncThunk(
  "clients/fetchClients",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { currentPage, limit } = getState().clients; // ✅ get latest from store
      const res = await axiosInstance.get(
        `/clients/fetch-client/${currentPage}/${limit}`
      );  

      return res.data?.data || {clients:[],totalCount:0};
      // return res.data?.data || {};
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to fetch clients");
    }
  }
);

// ✅ Delete a client
export const deleteClient = createAsyncThunk(
  "clients/deleteClient",
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/clients/delete-client/${id}`);
      return id; // return deleted client ID to remove from state
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to delete client");
    }
  }
);

// ✅ Add a client
export const addClient = createAsyncThunk(
  "clients/addClient",
  async (clientData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/clients/add-client", clientData);
      return res.data.data; // assuming new client data is in res.data.data
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to add client");
    }
  }
);

const clientSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch clients
      .addCase(fetchClients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
           state.loading = false;
        const { clients, totalCount } = action.payload;
        if (clients?.length > 0) {
          state.data = [...state.data, ...clients];
          state.currentPage += 1;
        } 
        state.totalCount = totalCount;
      })
      .addCase(fetchClients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete client
      .addCase(deleteClient.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (client) => client._id !== action.payload
        );
      })
      .addCase(deleteClient.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Add client
      .addCase(addClient.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(addClient.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default clientSlice.reducer;
