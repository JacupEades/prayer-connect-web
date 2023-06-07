import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import prayerReducer from "./slices/prayerSlice";
import tabReducer from "./slices/tabSlice";
import communityReducer from "./slices/communitySlice";
import { combineReducers } from "redux";
// Persist
import storageSession from "redux-persist/lib/storage/session";
import { persistReducer, persistStore } from "redux-persist";
// Can try this if storageSession does not work
// import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2 ";
import thunk from "redux-thunk";

const persistConfig = {
	key: "root",
	storage: storageSession,
	// stateReconciler: autoMergeLevel2,
};

// Make the reducer persistable
const persistedUserReducer = persistReducer(persistConfig, userReducer);
const persistedPrayerReducer = persistReducer(persistConfig, prayerReducer);
const persistedTabReducer = persistReducer(persistConfig, tabReducer);
const persistedComReducer = persistReducer(persistConfig, communityReducer);

const rootReducer = combineReducers({
	user: persistedUserReducer,
	prayer: persistedPrayerReducer,
	tab: persistedTabReducer,
	selectedCommunity: persistedComReducer,
});

export const store = configureStore({
	reducer: rootReducer,
	// Thunk middleware, which will intercept and stop non-serializable values
	// https://blog.logrocket.com/async-actions-bare-redux-thunk-custom-middleware/#using-thunk-redux-toolkit-manage-asynchronous-actions
	middleware: [thunk],
});

export const persistor = persistStore(store);
