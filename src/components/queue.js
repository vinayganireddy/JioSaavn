import React from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useSelector,useDispatch } from "react-redux";
import "../styles/queue.scss";
import { selectCurrent } from "../redux/slice/currentPlayingSlice";
export default function Queue() {
  const queue = useSelector((state) => state.Queue.value);
  const dispatch = useDispatch();
  let data = [];
  if (queue.length) {
    data = queue;
  }
  if (queue.songs) {
    data = queue.songs;
  }
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
        {data.map((e) => {
          return (
            <div className="music-container" onClick={()=>dispatch(selectCurrent(e))}>
              <div className="music-title">
                <img className="music-img" src={e.image[0].link} />
                <div>
                  <p className="music-name">{e.name}</p>
                  <p className="music-artist">{e.primaryArtists}</p>
                </div>
              </div>
              <div className="music-actions">
                <AiOutlineHeart className="music-icon" />
                <p className="music-time">
                  {Math.floor(e.duration / 60)}:
                  {
                    (e.duration - Math.floor(e.duration / 60) * 60) > 10 ?(e.duration - Math.floor(e.duration / 60) * 60) : "0"+(e.duration - Math.floor(e.duration / 60) * 60)
                  }
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
