import  {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

const homePageSlice = createSlice({
    name: 'HomePage',
    initialState: {
        albums: [],
        playlists: [],
        charts: [],
        trending: {},
        status: "pending",
        error: null
    },
    reducers:{},
    extraReducers: builder => builder.addCase(fetchHomepageData.pending,(state,action) => {
        state.status = "pending";
    })
    .addCase(fetchHomepageData.rejected,(state,action) => {
        state.status = "rejected";
        state.error = action.error;
    })
    .addCase(fetchHomepageData.fulfilled, (state,action)=>{
        state.status = "fulfilled";
        state.albums = action.payload.albums;
        state.playlists = action.payload.playlists;
        state.charts = action.payload.charts;
        state.trending = action.payload.trending;
    })
});

export const fetchHomepageData = createAsyncThunk("HomePage/fetch",async()=>{
    try {
        const {data} = await axios.get("https://saavn.me/modules?language=english");
        return data.data;
    } catch (error) {
        return error.message;
    }
});

export default homePageSlice;