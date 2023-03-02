import React, { useEffect } from "react";
import { TbRepeat, TbArrowsShuffle, TbDots } from "react-icons/tb";
import { MdSkipPrevious, MdSkipNext, MdVolumeUp } from "react-icons/md";
import { FaPlay, FaExpandAlt } from "react-icons/fa";
import { useSelector,useDispatch } from "react-redux";
import "../styles/player.scss";
import { selectCurrent } from "../redux/slice/currentPlayingSlice";
export default function Player() {
  const song = useSelector((state) => state.CurrentPlaying.song);
  const currentIndex = useSelector((state) => state.CurrentPlaying.index);
  const queue = useSelector((state) => state.Queue.song);
  const dispatch = useDispatch();
  let temp;
  if (queue && queue.length) {
    temp = queue;
  }
  if (queue && queue.songs) {
    temp = queue.songs;
  }

  const handleNext = () => {
    let nextIndex = currentIndex++;
    if(currentIndex === temp.length-1) {
      nextIndex = 0;
    }
    dispatch(selectCurrent({
      song: temp[nextIndex],
      index: nextIndex
    }))
  }
  const handlePrev = () => {
    let nextIndex = currentIndex--;
    if(currentIndex === 0) {
      nextIndex = temp.length-1;
    }
    dispatch(selectCurrent({
      song: temp[nextIndex],
      index: nextIndex
    }))
  }

  let url = "";
  if (song.downloadUrl) {
    url = song.downloadUrl[song.downloadUrl.length - 1].link;
  }

  const audioRef = React.useRef();

  useEffect(() => {
    if (audioRef.current && url) {
      audioRef.current.play();

      setTimeout(()=>{
        handleNext();
      },song.duration*1000)
      
    }
  }, [url]);

  return (
    <div className="player-container">
      <img className="player-img" src="http://placehold.it/50" />
      <audio ref={audioRef} src={url} />
      <div className="flexBox player-icons player-controls">
        <TbRepeat className="player-icon" />
        <MdSkipPrevious className="player-icon" onClick={handlePrev} />
        <FaPlay className="player-icon"  onClick={() => audioRef.current.pause()}/>
        <MdSkipNext className="player-icon" onClick={handleNext}/>
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
