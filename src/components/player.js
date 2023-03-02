import React from "react";
import { TbRepeat, TbArrowsShuffle, TbDots } from "react-icons/tb";
import { MdSkipPrevious, MdSkipNext, MdVolumeUp } from "react-icons/md";
import { FaPlay, FaExpandAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import "../styles/player.scss";
export default function Player() {
  const queue = useSelector(state =>state.Queue.value);
  console.log(queue);
  let url = "";
  if(queue.length) {
    url = queue[0].downloadUrl[0].link
  }
  if(queue.songs) {
    url = queue.songs[0].downloadUrl[0].link
  }
  return (
    <div className="player-container">
      <img className="player-img" src="http://placehold.it/50" />
      <audio src={url}/>
      <div className="flexBox player-icons player-controls">
        <TbRepeat className="player-icon" />
        <MdSkipPrevious className="player-icon" />
        <FaPlay className="player-icon" />
        <MdSkipNext className="player-icon" />
        <TbArrowsShuffle className="player-icon" />
      </div>
      <div className="flexBox player-icons">
        <p>00:00/3:15</p>
        <TbDots className="player-icon" />
        <MdVolumeUp className="player-icon" />
        <FaExpandAlt className="player-icon" />
      </div>
    </div>
  );
}
