import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import MovieDbApiServices from "src/services/movieDbApiServices/movieDbApiServices";
import utils from "src/utils/utils";

const { addBuilderCases } = utils;

const actionPrefix = "DISCOVER";

interface IDiscoverSlice {
  isLoading: boolean;
  results: Array<any>;
  appliedFilters: object;
}

const initialState: IDiscoverSlice = {
  isLoading: true,
  results: [],
  appliedFilters: {},
};

export const fetchDiscoveredItems = createAsyncThunk(
  `${actionPrefix}/fetchDiscoveredItems`,
  async ({ filters, type }: any) => {
    return await MovieDbApiServices.getDiscovered(filters, type);
  }
);

const DiscoverSlice = createSlice({
  name: actionPrefix,
  initialState,
  reducers: {
    applyFilters: (state, action) => {
      state.appliedFilters = action.payload;
    },
  },
  extraReducers: {
    ...addBuilderCases<IDiscoverSlice>(
      fetchDiscoveredItems,
      (state, action) => {
        state.isLoading = true;
      },
      (state, action) => {
        state.isLoading = false;
        state.results = action.payload.results;
      },
      () => {}
    ),
  },
});

const { reducer, actions } = DiscoverSlice;
export const { applyFilters } = actions;

export default reducer;
