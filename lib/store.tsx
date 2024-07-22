import { configureStore, Middleware } from "@reduxjs/toolkit";
import infoSlice from "./features/info/infoSlice";
import routeSlice from "./features/routes/routeSlice";
import logger from "redux-logger";
const store = configureStore({
  reducer: {
    user: infoSlice,
    routes: routeSlice,
  },
  middleware: (getDefaultMiddleware) => {
    // return getDefaultMiddleware().concat(logger);
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});

export default store;
