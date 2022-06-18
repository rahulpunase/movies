import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import MovieDbApiServices from "src/services/movieDbApiServices/movieDbApiServices";

const actionPrefix = "CONFIG";

const initialState = {
  config: {
    images: {
      base_url: "",
    },
  },
  isLoading: false,
};

export const fetchConfiguration = createAsyncThunk(
  `${actionPrefix}/fetchConfiguration`,
  async () => {
    const response = await MovieDbApiServices.getAppConfigurations();
    return response;
  }
);

const ConfigurationSlice = createSlice({
  name: actionPrefix,
  initialState,
  reducers: {
    loading: (state) => {
      state.isLoading = true;
    },
    loaded: (state) => {
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchConfiguration.fulfilled, (state, action) => {
      state.config = action.payload;
    });
  },
});

const { reducer, actions } = ConfigurationSlice;

export const { loading, loaded } = actions;
export default reducer;
