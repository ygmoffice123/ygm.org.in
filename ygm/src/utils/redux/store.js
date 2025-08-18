import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./slices/adminSlice.js";
import clientReducer from "./slices/clientDataSlice.js";
import strengthReducer from "./slices/strengthDataSlice.js";
import contactReducer from "./slices/contacDatatSlice.js";
import servicesReducer from "./slices/serviceDataSlice.js";
import feedbackReducer from "./slices/feedbackDataSlice.js";

const store = configureStore({
  reducer: {
    admin: adminReducer,
    clients: clientReducer,
    strengths: strengthReducer,
    contact: contactReducer,
    services: servicesReducer,
    feedback: feedbackReducer,
  },
});

export default store;
