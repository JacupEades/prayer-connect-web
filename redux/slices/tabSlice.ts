import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	tab: "Community Prayers",
};

export const tabSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		tabSelect: (state, action) => {
			state.tab = action.payload.tab;
		},
	},
});

export const { tabSelect } = tabSlice.actions;

export default tabSlice.reducer;
