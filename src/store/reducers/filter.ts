import { createSlice } from "@reduxjs/toolkit";

type FilterState = { term: string; };
const initialState: FilterState = { term: "", };

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.term = action.payload;
    },
  }
});

export const { setFilter } = filterSlice.actions;
export default filterSlice.reducer;
