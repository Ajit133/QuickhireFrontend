import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://127.0.0.1:8000/api";

export const applyJob = createAsyncThunk(
  "application/applyJob",
  async (data) => {
    const res = await axios.post(`${API}/applications`, data);
    return res.data;
  }
);

const applicationSlice = createSlice({
  name: "application",
  initialState: {
    loading: false,
    success: false,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(applyJob.pending, (state) => {
        state.loading = true;
      })
      .addCase(applyJob.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      });
  },
});

export default applicationSlice.reducer;