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
	},
});

export const { changeCommunity } = communitySlice.actions;

export default communitySlice.reducer;
