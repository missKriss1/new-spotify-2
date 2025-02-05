import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { artistsReducer } from "../features/artists/artistsSlice.ts";
import { albumReducer } from "../features/albums/albumsSlice.ts";
import { tracksReducer } from "../features/tracks/tracksSlice.ts";
import { userReducer } from "../features/users/userSlice.ts";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import {
  FLUSH,
  PAUSE,
  PURGE,
  REGISTER,
  REHYDRATE,
  PERSIST,
} from "redux-persist";
import { trackHistoryReducer } from "../features/trackHistories/trackHistorySlice.ts";
import { artistsAdminReducer } from "../features/admin/artistsAdminSlice.ts";
import { albumAdminReducer } from "../features/admin/albumsAdminSlice.ts";
import { tracksAdminReducer } from "../features/admin/tracksAdminSlice.ts";

const userPersistConfig = {
  key: "store:users",
  storage,
  whitelist: ["user"],
};

const rootReducer = combineReducers({
  artists: artistsReducer,
  albums: albumReducer,
  tracks: tracksReducer,
  track_history: trackHistoryReducer,
  users: persistReducer(userPersistConfig, userReducer),
  adminArtists: artistsAdminReducer,
  adminAlbums: albumAdminReducer,
  adminTracks: tracksAdminReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
