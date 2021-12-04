import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { applyMiddleware } from "redux";

//persist
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { computerPlayerMiddleware } from "./domain/computerPlayerController";
import gameSlice from "./slices/game";
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = {
  game: gameSlice,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers(rootReducer)
);

export const store = configureStore({
  reducer: persistedReducer,
  // middleware for redux persist below
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(computerPlayerMiddleware),
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
