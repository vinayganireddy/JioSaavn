import React from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import "../styles/queue.scss";
import { selectCurrent } from "../redux/slice/currentPlayingSlice";
import { v4 as uuid } from "uuid";
import { likeSong, dislikeSong } from "../redux/slice/likedSongsSlice";
export default function Queue() {
  const queue = useSelector((state) => state.Queue.value);
  const likedSongs = useSelector((state) => state.LikedSongs.songs);
  const dispatch = useDispatch();
  let data = [];
  if (queue && queue.length) {
    data = queue;
  }
  if (queue && queue.songs) {
    data = queue.songs;
  }
  const formatTime = (arg) => {
    let mins, secs;
    mins = Math.floor(arg / 60);
    if (mins < 10) mins = "0" + mins;
    secs = (arg % 60).toFixed(0);
    if (parseFloat(secs) < 10) secs = "0" + secs;
    return mins + ":" + secs;
  };
  return (
    <div className="queue-container">
      <div className="queue-header">
        <p className="queue-header-title">Queue</p>
        <div className="queue-header-actions">
          <HiDotsHorizontal className="queue-header-icon" />
          <button className="queue-header-btn">Save</button>
          <button className="queue-header-btn">Clear</button>
        </div>
      </div>
      <div className="queue-content">
        {data &&
          data.map((e, index) => {
            const liked = likedSongs.filter((ls) => ls === e.id);
            return (
              <div className="music-container" key={uuid()}>
                <div
                  className="music-title"
                  onClick={() => dispatch(selectCurrent({ song: e, index }))}
                >
                  <img className="music-img" src={e.image[0].link} />
                  <div>
                    <p className="music-name">{e.name}</p>
                    <p className="music-artist">{e.primaryArtists}</p>
                  </div>
                </div>
                <div className="music-actions">
                  {!liked.length && (
                    <AiOutlineHeart
                      onClick={() => dispatch(likeSong({ songId: e.id }))}
                      className="music-icon"
                    />
                  )}
                  {liked.length !==0 && (
                    <AiFillHeart
                    style={{color:"red"}}
                      onClick={() => dispatch(dislikeSong({ songId: e.id }))}
                      className="music-icon"
                    />
                  )}
                  <p className="music-time">{formatTime(e.duration)}</p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
