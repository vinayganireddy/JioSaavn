import { configureStore } from "@reduxjs/toolkit";
import homePageSlice from "./slice/homePageSlice";
import queueSlice from "./slice/queueSlice";

const store = configureStore({
    reducer: {
        HomePage: homePageSlice.reducer,
        Queue: queueSlice.reducer
    }
});

export default store;