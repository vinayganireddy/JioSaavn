import React, { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { IoMusicalNotesOutline } from "react-icons/io5";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { VscHistory } from "react-icons/vsc";
import { BsMusicNoteList } from "react-icons/bs";
import { SiGooglepodcasts } from "react-icons/si";
import { TfiMicrophoneAlt } from "react-icons/tfi";

import "../styles/sidebar.scss";
import { useDispatch, useSelector } from "react-redux";
import { addPlaylist, deletePlaylist, fetchPlaylistData } from "../redux/slice/playlistSlice";
import { fetchLikedSongs } from "../redux/slice/likedSongsSlice";

export default function SideBar() {
  const [show, setShow] = useState(false);
  const [value, setValue] = useState("");
  const playlists = useSelector((state) => state.Playlists.value);
  const likedSongs = useSelector((state) =>  state.LikedSongs.songs)
  const dispatch = useDispatch();
  const handleAdd = () => {
    dispatch(addPlaylist(value));
    setShow(false);
    setValue("");
  };
  useEffect(()=>{
    localStorage.setItem("playlists",JSON.stringify(playlists))
  },[playlists])
  return (
    <div className="sideBar-container">
      <p className="sideBar-subTitle">Browse</p>
      <ul className="sideBar-list">
        <li className="sideBar-list-item">New Release</li>
        <li className="sideBar-list-item">Top Charts</li>
        <li className="sideBar-list-item">Top Playlist</li>
        <li className="sideBar-list-item">Podcasts</li>
        <li className="sideBar-list-item">Top Artists</li>
        <li className="sideBar-list-item">Radio</li>
      </ul>
      <p className="sideBar-subTitle">My Library</p>
      <ul className="sideBar-list">
        <li className="sideBar-list-item">
          <VscHistory />
          <span>History</span>
        </li>
        <li className="sideBar-list-item">
          <IoMusicalNotesOutline />
          <span>Music</span>
        </li>
        <li className="sideBar-list-item">
          <BsMusicNoteList />
          <span>Albums</span>
        </li>
        <li className="sideBar-list-item">
          <SiGooglepodcasts />
          <span>Podcasts</span>
        </li>
        <li className="sideBar-list-item">
          <TfiMicrophoneAlt />
          <span>Artists</span>
        </li>
      </ul>
      <button className="sideBar-add-btn" onClick={() => setShow(!show)}>
        <IoMdAdd />
        <span>New Playlist</span>
      </button>
      {show && (
        <div style={{ display: "flex", alignItems: "center",marginTop:"0.5rem" }}>
          <input
            style={{ maxWidth: "7rem",marginRight:"0.2rem" }}
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button  onClick={handleAdd}>Add</button>
        </div>
      )}
      {playlists.map((e) => (
        <>
          <p className="sideBar-subTitle" key={e.id} onClick={()=>dispatch(fetchPlaylistData({playlist:e,dispatch}))}>
            {e.name}
          </p>
            <span onClick={() => dispatch(deletePlaylist(e.id))}>
              <IoMdCloseCircleOutline />
            </span>
        </>
      ))}
      <ul className="sideBar-list">
        <li className="sideBar-list-item" onClick={()=>dispatch(fetchLikedSongs({likedSongs,dispatch}))}>Liked Songs</li>
      </ul>
    </div>
  );
}
