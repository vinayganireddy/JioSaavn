import { createSlice } from "@reduxjs/toolkit";
import {v4 as uuid} from "uuid";

// {
//     id: uuid(),
//     name: "",
//     songs: []
// }
const playlists = localStorage.getItem('playlists')
const playlistSlice = createSlice({
    name: "Playlists",
    initialState: {
        value: JSON.parse(playlists) || []
    },
    reducers: {
        addPlaylist: (state, action) => {
            state.value.push({
                id:uuid(),
                name: action.payload,
                songs: []
            })
        },
        addSongToPlaylist : (state,action) => {
            state.value = state.value.map(e => {
                if(e.id == action.payload.playlistId) e.songs.push(action.payload.songId);
                return e;
            })
        },
        deleteSongFromPlaylist : (state,action) => {
            state.value = state.value.map(e => {
                if(e.id == action.payload.playlistId) {
                    e.songs = e.songs.filter(songId => songId !== action.payload.songId);
                }
                return e;
            })
        },
        deletePlaylist : (state,action) => {
            state.value = state.value.filter(e => e.id !== action.payload);
        }
    }
});

export const {addPlaylist,addSongToPlaylist,deletePlaylist,deleteSongFromPlaylist} = playlistSlice.actions;

export default playlistSlice;