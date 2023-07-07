import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	tab: "Community Prayers",
};

export const tabSlice = createSlice({
	name: "tab",
	initialState,
	reducers: {
		tabSelect: (state, action) => {
			state.tab = action.payload.tab;
		},
		resetTab: (state) => {
			state.tab = "Community Prayers";
		},
	},
});

export const { tabSelect, resetTab } = tabSlice.actions;

export default tabSlice.reducer;
