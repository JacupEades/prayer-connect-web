import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	name: "Anonymous",
	email: "",
	role: "Anonymous",
	uid: "",
	token: "",
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
			state.token = action.payload.token;
		},
		userLoggedOut: (state) => {
			state.name = "Anonymous";
			state.email = "";
			state.role = "Anonymous";
			state.uid = "";
			state.token = "";
		},
	},
});

export const { userLoggedIn, userLoggedOut } = userSlice.actions;

export default userSlice.reducer;
