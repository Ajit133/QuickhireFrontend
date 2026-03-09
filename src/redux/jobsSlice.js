import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://127.0.0.1:8000/api";

export const fetchJobs = createAsyncThunk("jobs/fetchJobs", async () => {
  const res = await axios.get(`${API}/jobs`);
  return res.data;
});

export const addJob = createAsyncThunk("jobs/addJob", async (jobData) => {
  const res = await axios.post(`${API}/jobs`, jobData);
  return res.data;
});

export const deleteJob = createAsyncThunk("jobs/deleteJob", async (jobId) => {
  await axios.delete(`${API}/jobs/${jobId}`);
  return jobId;
});

const jobsSlice = createSlice({
  name: "jobs",
  initialState: {
    jobs: [],
    loading: false,
    error: null,
    adding: false,
    deleting: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      // fetchJobs
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload;
      })
      .addCase(fetchJobs.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch jobs";
      })
      // addJob
      .addCase(addJob.pending, (state) => {
        state.adding = true;
        state.error = null;
      })
      .addCase(addJob.fulfilled, (state, action) => {
        state.adding = false;
        state.jobs.unshift(action.payload);
      })
      .addCase(addJob.rejected, (state) => {
        state.adding = false;
        state.error = "Failed to add job";
      })
      // deleteJob
      .addCase(deleteJob.pending, (state, action) => {
        state.deleting = action.meta.arg;
      })
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.deleting = null;
        state.jobs = state.jobs.filter(
          (j) => (j.id ?? j._id) !== action.payload
        );
      })
      .addCase(deleteJob.rejected, (state) => {
        state.deleting = null;
        state.error = "Failed to delete job";
      });
  },
});

export default jobsSlice.reducer;