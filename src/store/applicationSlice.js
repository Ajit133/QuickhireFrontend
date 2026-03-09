import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://127.0.0.1:8000/api";

export const applyJob = createAsyncThunk(
  "application/applyJob",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API}/applications/`, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.detail ??
        err.response?.data?.message ??
        "Submission failed. Please try again."
      );
    }
  }
);

const applicationSlice = createSlice({
  name: "application",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },

  reducers: {
    resetApplication: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(applyJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(applyJob.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(applyJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Something went wrong.";
      });
  },
});

export const { resetApplication } = applicationSlice.actions;
export default applicationSlice.reducer;