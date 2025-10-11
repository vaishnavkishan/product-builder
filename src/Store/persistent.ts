import { configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import createIndexedDBStorage from "redux-persist-indexeddb-storage";
import { globalSlice } from "./GlobalStore";
import { useDispatch, useSelector } from "react-redux";

const indexedDBStorage = createIndexedDBStorage({
  name: "myAppDB",
  storeName: "reduxPersist",
  version: 1,
});

const persistConfigIndexedDB = {
  key: "indexedDB",
  storage: indexedDBStorage,
};

export const rootReducer = globalSlice.reducer;

const persistedReducer = persistReducer(persistConfigIndexedDB, rootReducer);

const store = configureStore({
  reducer: {
    global: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore redux-persist action types
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
