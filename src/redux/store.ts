import { configureStore } from "@reduxjs/toolkit";
import ConfigurationReducer from "./ducks/configuration.slice";
import ContentSlice from "./ducks/content.slice";

const store = configureStore({
  reducer: {
    configureReducer: ConfigurationReducer,
    contentReducer: ContentSlice,
  },
});
export type AppDispatch = typeof store.dispatch;
export type TRootState = ReturnType<typeof store.getState>;
export default store;
