import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
// Persist
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";

const persistConfig = {
	key: "root",
	storage,
};

// Make the reducer persistable
const persistedUserReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
	reducer: {
		persistedUserReducer,
	},
	// Thunk middleware, which will intercept and stop non-serializable values
	// https://blog.logrocket.com/async-actions-bare-redux-thunk-custom-middleware/#using-thunk-redux-toolkit-manage-asynchronous-actions
	middleware: [thunk],
});

export const persistor = persistStore(store);
