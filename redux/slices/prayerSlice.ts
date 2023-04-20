import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	prayerId: "",
	uid: "",
};

export const prayerSlice = createSlice({
	name: "prayer",
	initialState,
	reducers: {
		prayerById: (state, action) => {
			state.prayerId = action.payload.prayerId;
			state.uid = action.payload.uid;
		},
		resetPrayerStore: (state) => {
			state.prayerId = "";
			state.uid = "";
		},
	},
});

export const { prayerById, resetPrayerStore } = prayerSlice.actions;

export default prayerSlice.reducer;
