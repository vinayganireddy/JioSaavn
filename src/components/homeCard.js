import React from "react";
import { useDispatch } from "react-redux";
import { fetchDetails } from "../redux/slice/queueSlice";
import "../styles/homecard.scss";
export default function HomeCard({ data }) {
  const dispatch = useDispatch();
  const handleClick = () => {
    const songsUrl = "https://saavn.me/songs?id="+data.id;
    const albumUrl = "https://saavn.me/albums?id="+data.id;
    const playlistUrl = "https://saavn.me/playlists?id="+data.id;
    let url = "";
    if(data.type === "playlist") url = playlistUrl;
    if(data.type === "album") url = albumUrl;
    if(data.type === "song") url = songsUrl;
    dispatch(fetchDetails({url,dispatch}));
  };
  return (
    <div className="homeCard-container">
      <div className="homeCard-card" onClick={handleClick}>
        <img className="homeCard-img" src={data.image[2].link} />
        <p className="homeCard-title">{data.title}</p>
        <p className="homeCard-subTitle">{data.subtitle}</p>
      </div>
    </div>
  );
}
