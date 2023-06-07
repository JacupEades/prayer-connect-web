import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	community: "G",
};

export const communitySlice = createSlice({
	name: "selectedCommunity",
	initialState,
	reducers: {
		changeCommunity: (state, action) => {
			state.community = action.payload.community;
		},
		resetCommunity: (state) => {
			state.community = "G";
		},
	},
});

export const { changeCommunity, resetCommunity } = communitySlice.actions;

export default communitySlice.reducer;
