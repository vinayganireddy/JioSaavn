import { configureStore } from "@reduxjs/toolkit";
import currentPlayingSlice from "./slice/currentPlayingSlice";
import homePageSlice from "./slice/homePageSlice";
import likedSongsSlice from "./slice/likedSongsSlice";
import playlistSlice from "./slice/playlistSlice";
import queueSlice from "./slice/queueSlice";

const store = configureStore({
    reducer: {
        HomePage: homePageSlice.reducer,
        Queue: queueSlice.reducer,
        CurrentPlaying: currentPlayingSlice.reducer,
        Playlists: playlistSlice.reducer,
        LikedSongs : likedSongsSlice.reducer
    }
});

export default store;