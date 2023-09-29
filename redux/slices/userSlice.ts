import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	name: "Anonymous",
	email: "",
	role: "Anonymous",
	uid: "",
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		userLoggedIn: (state, action) => {
			state.name = action.payload.name;
			state.email = action.payload.email;
			state.role = action.payload.role;
			state.uid = action.payload.uid;
		},
		userLoggedOut: (state) => {
			state.name = "";
			state.email = "";
			state.role = "";
			state.uid = "";
		},
	},
});

export const { userLoggedIn, userLoggedOut } = userSlice.actions;

export default userSlice.reducer;
