import React, { useEffect, useState } from "react";
import { TbRepeat, TbArrowsShuffle, TbDots } from "react-icons/tb";
import { MdSkipPrevious, MdSkipNext, MdVolumeUp } from "react-icons/md";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { GiPauseButton } from "react-icons/gi";
import { FaPlay, FaExpandAlt } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import "../styles/player.scss";
import Modal from "./modal";
import { IoMdCloseCircleOutline } from "react-icons/io";
import {
  addPlaylist,
  addSongToPlaylist,
  deletePlaylist,
} from "../redux/slice/playlistSlice";
import { selectCurrent } from "../redux/slice/currentPlayingSlice";
import "../styles/sidebar.scss";
import { dislikeSong, likeSong } from "../redux/slice/likedSongsSlice";
export default function Player() {
  const [openModal, setOpenModal] = useState(false);
  const song = useSelector((state) => state.CurrentPlaying.song);
  const likedSongs = useSelector((state) => state.LikedSongs.songs);
  const currentIndex = useSelector((state) => state.CurrentPlaying.index);
  const queue = useSelector((state) => state.Queue.value);
  const [show, setShow] = useState(false);
  const [value, setValue] = useState("");
  const [playing, setPlaying] = useState(song.downloadUrl ? true : false);
  const [currTime, setCurrTime] = useState();
  const playlists = useSelector((state) => state.Playlists.value);
  const handleAdd = () => {
    dispatch(addPlaylist(value));
    setShow(false);
    setValue("");
  };
  useEffect(() => {
    localStorage.setItem("playlists", JSON.stringify(playlists));
  }, [playlists]);
  const dispatch = useDispatch();
  let temp;
  if (queue && queue.length) {
    temp = queue;
  }
  if (queue && queue.songs) {
    temp = queue.songs;
  }

  const handleNext = () => {
    let nextIndex = currentIndex + 1;
    if (currentIndex === temp.length - 1) {
      nextIndex = 0;
    }
    dispatch(
      selectCurrent({
        song: temp[nextIndex],
        index: nextIndex,
      })
    );
  };
  const handlePrev = () => {
    let nextIndex = currentIndex - 1;
    if (currentIndex === 0) {
      nextIndex = temp.length - 1;
    }
    dispatch(
      selectCurrent({
        song: temp[nextIndex],
        index: nextIndex,
      })
    );
  };

  const audioRef = React.useRef();
  let liked = [];
  let url = "";
  if (song.downloadUrl) {
    url = song.downloadUrl[song.downloadUrl.length - 1].link;
    liked = likedSongs.filter((e) => e === song.id);
  }

  useEffect(() => {
    if (audioRef.current && url) {
      audioRef.current.play();

      setTimeout(() => {
        handleNext();
      }, song.duration * 1000);
    }
  }, [url]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrTime(audioRef.current.currentTime);
    }, 100);
    return () => clearInterval(interval);
  }, [currTime]);

  const formatTime = (arg) => {
    let mins, secs;
    mins = Math.floor(arg / 60);
    if (mins < 10) mins = "0" + mins;
    secs = (arg % 60).toFixed(0);
    if (parseFloat(secs) < 10) secs = "0" + secs;
    return mins + ":" + secs;
  };
  const [hover,setHover] = useState({
    currentTime: 0,
    clientX:0,
    show: false
  })
  const handleHover = (event) => {
    const clientX= event.clientX;
    const clientWidth = event.target.clientWidth;
    const currentTime = ((clientX/clientWidth)*song.duration);
    setHover({clientX,currentTime,show:true});
  }
  const handleSkip = () => {
    audioRef.current.currentTime = hover.currentTime;
    setCurrTime(hover.currentTime);
  }

  return (
    <div className="player-container">
      <div className="player-progress-container" onMouseLeave={()=>setHover({...hover, show:false})} onMouseEnter={handleHover} onClick={handleSkip}>
        {hover.show && <p className="player-progress-tooltip" style={{left: hover.clientX}}>{formatTime(hover.currentTime)}</p>}
        <span className="player-progress" style={{width: ((currTime/song.duration)*100)+"%"}}/>
      </div>
      <div>
        {song.image && <img className="player-img" src={song.image[0].link} />}
        {!liked.length && (
          <AiOutlineHeart
            onClick={() => dispatch(likeSong({ songId: song.id }))}
            className="music-icon"
          />
        )}
        {liked.length !== 0 && (
          <AiFillHeart
            style={{ color: "red" }}
            onClick={() => dispatch(dislikeSong({ songId: song.id }))}
            className="music-icon"
          />
        )}
      </div>
      <audio ref={audioRef} src={url} />
      <div className="flexBox player-icons player-controls">
        <TbRepeat className="player-icon" />
        <MdSkipPrevious className="player-icon" onClick={handlePrev} />
        {!playing && url && (
          <FaPlay
            className="player-icon"
            onClick={() => {
              audioRef.current.play();
              setPlaying(true);
            }}
          />
        )}
        {playing && url && (
          <GiPauseButton
            className="player-icon"
            onClick={() => {
              audioRef.current.pause();
              setPlaying(false);
            }}
          />
        )}
        <MdSkipNext className="player-icon" onClick={handleNext} />
        <TbArrowsShuffle className="player-icon" />
      </div>
      <div className="flexBox player-icons">
        {!url && <p>00:00/00:00</p>}
        {url && (
          <p>
            {formatTime(currTime)}/{formatTime(song.duration)}
          </p>
        )}
        <TbDots className="player-icon" />
        <MdVolumeUp className="player-icon" />
        <IoMdAdd
          className="player-icon"
          onClick={() => setOpenModal(!openModal)}
        />
      </div>
      <Modal
        open={openModal}
        setOpen={setOpenModal}
        style={{ transform: "translateY(-90%)" }}
      >
        <div
          style={{
            backgroundColor: "#fff",
            padding: "1rem",
            borderRadius: "2rem",
            zIndex: 2,
            minHeight: "30rem",
            minWidth: "30rem",
            textAlign: "center",
          }}
        >
          <button className="sideBar-add-btn" onClick={() => setShow(!show)}>
            <IoMdAdd />
            <span>New Playlist</span>
          </button>
          {show && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "0.5rem",
              }}
            >
              <input
                style={{ maxWidth: "7rem", marginRight: "0.2rem" }}
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <button onClick={handleAdd}>Add</button>
            </div>
          )}
          {playlists.map((e) => (
            <>
              <p
                className="sideBar-subTitle"
                key={e.id}
                onClick={() =>
                  dispatch(
                    addSongToPlaylist({ playlistId: e.id, songId: song.id })
                  )
                }
              >
                {e.name}
              </p>
              <span onClick={() => dispatch(deletePlaylist(e.id))}>
                <IoMdCloseCircleOutline />
              </span>
            </>
          ))}
        </div>
      </Modal>
    </div>
  );
}
