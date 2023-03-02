import { configureStore } from "@reduxjs/toolkit";
import currentPlayingSlice from "./slice/currentPlayingSlice";
import homePageSlice from "./slice/homePageSlice";
import queueSlice from "./slice/queueSlice";

const store = configureStore({
    reducer: {
        HomePage: homePageSlice.reducer,
        Queue: queueSlice.reducer,
        CurrentPlaying: currentPlayingSlice.reducer
    }
});

export default store;