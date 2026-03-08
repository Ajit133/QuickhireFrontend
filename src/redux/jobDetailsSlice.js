import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://127.0.0.1:8000/api";

export const fetchJobDetails = createAsyncThunk(
  "jobDetails/fetchJobDetails",
  async (id) => {
    const res = await axios.get(`${API}/jobs/${id}`);
    return res.data;
  }
);

const jobDetailsSlice = createSlice({
  name: "jobDetails",
  initialState: {
    job: null,
    loading: false,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchJobDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchJobDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.job = action.payload;
      });
  },
});

export default jobDetailsSlice.reducer;