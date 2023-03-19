import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { coursePagePersistSlice } from "./reducers";

const persistConfig = {
  key: "root",
  storage,
};

const reducersToPersist = combineReducers({
  coursePage: coursePagePersistSlice.reducer,
});
const persistedReducer = persistReducer(persistConfig, reducersToPersist);

export const store = configureStore({
  reducer: {
    persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
