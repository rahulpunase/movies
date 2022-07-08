import { configureStore } from "@reduxjs/toolkit";
import ConfigurationReducer from "./ducks/configuration.slice";
import ContentSlice from "./ducks/content.slice";
import MovieDetailsSlice from "./ducks/movieDetails.slice";
import TVShowDetailsSlice from "./ducks/tvShowDetails.slice";
import SearchSlice from "./ducks/search.slice";
import ProfileSlice from "./ducks/profile.slice";
import DiscoverSlice from "./ducks/discover.slice";

const store = configureStore({
  reducer: {
    configureReducer: ConfigurationReducer,
    contentReducer: ContentSlice,
    movieDetailsReducer: MovieDetailsSlice,
    tvShowDetailsReducer: TVShowDetailsSlice,
    searchReducer: SearchSlice,
    profilereducer: ProfileSlice,
    discoverReducer: DiscoverSlice,
  },
});
export type AppDispatch = typeof store.dispatch;
export type TRootState = ReturnType<typeof store.getState>;
export default store;
