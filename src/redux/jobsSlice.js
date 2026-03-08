import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://127.0.0.1:8000/api";

export const fetchJobs = createAsyncThunk("jobs/fetchJobs", async () => {
  const res = await axios.get(`${API}/jobs`);
  return res.data;
});

const jobsSlice = createSlice({
  name: "jobs",
  initialState: {
    jobs: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload;
      })
      .addCase(fetchJobs.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch jobs";
      });
  },
});

export default jobsSlice.reducer;