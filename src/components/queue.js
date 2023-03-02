import React from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { useSelector } from "react-redux";
import "../styles/queue.scss";
export default function Queue() {
  const queue = useSelector((state) => state.Queue.value);
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
            <div>
              <div>
                <img src={e.image[0].link} />
                <p>{e.name}</p>
                <p>{e.primaryArtists}</p>
              </div>
              <div>
                <HiDotsHorizontal className="queue-header-icon" />
                <p>{Math.floor(e.duration/60)}:{(e.duration - (Math.floor(e.duration/60))*60).toFixed(2)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
