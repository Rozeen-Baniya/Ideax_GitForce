import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface initialState {
  loading: boolean;
  error: string | null;
  data: any;
}

const initialState: initialState = {
  loading: false,
  error: null,
  data: null,
};

export const fetchTransport = createAsyncThunk(
  "transport/fetchTransport",
  async () => {
    const res = await axios.get("http://localhost:3000/api/transport");
    return res.data;
  }
);

export const fetchTripByTransportId = createAsyncThunk(
  "transport/fetchTripByTransportId",
  async (token: string) => {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/trips/transport/${token}`
    );
    return res.data;
  }
);

const transportSlice = createSlice({
  name: "transport",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTransport.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(fetchTransport.rejected, (state, action) => {
      state.data = null;
      state.loading = false;
      state.error = action.error.message ?? null;
    });
    builder.addCase(fetchTransport.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTripByTransportId.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(fetchTripByTransportId.rejected, (state, action) => {
      state.data = null;
      state.loading = false;
      state.error = action.error.message ?? null;
    });
    builder.addCase(fetchTripByTransportId.pending, (state) => {
      state.loading = true;
    });
  },
});

export default transportSlice.reducer;
