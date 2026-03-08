import { configureStore } from "@reduxjs/toolkit";
import jobsReducer from "./jobsSlice";
import jobDetailsReducer from "./jobDetailsSlice";
import applicationReducer from "./applicationSlice";

export const store = configureStore({
  reducer: {
    jobs: jobsReducer,
    jobDetails: jobDetailsReducer,
    application: applicationReducer,
  },
});