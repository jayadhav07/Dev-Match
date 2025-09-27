import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedSliceReducer from "./feedSlice";
import connectionSliceReducer from "./connectionSlice";
import requestSliceReducer from "./requestsSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedSliceReducer,
    connections: connectionSliceReducer,
    request: requestSliceReducer,
  },
});

export default appStore;
