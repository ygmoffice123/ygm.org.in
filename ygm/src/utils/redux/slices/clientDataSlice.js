import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios";

const initialState = {
  data: [],
  loading: false,
  error: null,
  currentPage: 0,
  limit: 4,
  totalCount: 0,
};

// ✅ Fetch all clients
export const fetchClients = createAsyncThunk(
  "clients/fetchClients",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { currentPage, limit } = getState().clients;
      const res = await axiosInstance.get(`/clients/fetch-client/${currentPage}/${limit}`);
      return res.data?.data || { clients: [], totalCount: 0 };
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
      return id;
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
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to add client");
    }
  }
);

// ✅ Update a client
export const updateClient = createAsyncThunk(
  "clients/updateClient",
  async ({ id, clientData }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.put(`/clients/edit-client/${id}`, clientData);
      return res.data.data; // updated client
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to update client");
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
        state.data = state.data.filter((client) => client._id !== action.payload);
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
      })

      // Update client
      .addCase(updateClient.fulfilled, (state, action) => {
         state.data = state.data.map(client =>
          client._id === action.payload._id ? action.payload : client
        );
      })
      .addCase(updateClient.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default clientSlice.reducer;
