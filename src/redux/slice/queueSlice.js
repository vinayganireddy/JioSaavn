import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import { selectCurrent } from "./currentPlayingSlice";

const queueSlice = createSlice({
    name:"Queue",
    initialState: {
        value: {},
        status: "pending",
        error: null
    },
    reducers:{},
    extraReducers: builder => builder.addCase(fetchDetails.pending, (state,action) =>{
        state.status = "pending";
    })
    .addCase(fetchDetails.rejected,(state,action)=>{
        state.status = "rejected";
        state.error = action.error
    })
    .addCase(fetchDetails.fulfilled,(state,action)=>{
        state.status = "fulfilled";
        state.value = action.payload;
    })
})

export const fetchDetails = createAsyncThunk("Queue/fetch",async({url,dispatch})=>{
    try {
        const {data} = await axios.get(url);
        const queue = data.data;
        let temp;
        if(queue.length) {
            temp = queue[0]
          }
          if(queue.songs) {
            temp = queue.songs[0]
          }
        dispatch(selectCurrent(temp))
        return queue;
    } catch (error) {
        return error.message
    }
})

export default queueSlice;