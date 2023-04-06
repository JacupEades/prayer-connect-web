import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	client: {
		toggleFormVisible: false,
		formId: undefined,
		deleteId: null,
	},
};

export const ReducerSlice = createSlice({
	name: "prayer-connect-web",
	initialState,
	reducers: {
		toggleChangeAction: (state) => {
			// This syntax makes it toggle
			state.client.toggleFormVisible = !state.client.toggleFormVisible;
		},
		updateAction: (state, action) => {
			// console.log("Handler action: ", action.payload);
			state.client.formId = action.payload;
		},
		deleteAction: (state, action) => {
			state.client.deleteId = action.payload;
		},
	},
});

export const { toggleChangeAction, updateAction, deleteAction } =
	ReducerSlice.actions;

export default ReducerSlice.reducer;
