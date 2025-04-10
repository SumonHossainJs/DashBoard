import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const userPersistConfig = {
  key: "user",
  storage,
};

const rootReducer = combineReducers({
  user: persistReducer(userPersistConfig, userSlice),
});

const store = configureStore({
  reducer: rootReducer,
});

const persistor = persistStore(store);

export const AppDispatch = store.dispatch;
export { store, persistor };