import React from "react";
import {IoMdAdd} from "react-icons/io";
import {IoMusicalNotesOutline} from "react-icons/io5";
import {VscHistory} from "react-icons/vsc";
import {BsMusicNoteList} from "react-icons/bs";
import {SiGooglepodcasts} from "react-icons/si";
import {TfiMicrophoneAlt} from "react-icons/tfi";

import "../styles/sidebar.scss";

export default function SideBar() {
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
            <VscHistory/>
            <span>History</span>
        </li>
        <li className="sideBar-list-item">
            <IoMusicalNotesOutline/>
            <span>Music</span>
        </li>
        <li className="sideBar-list-item">
            <BsMusicNoteList/>
            <span>Albums</span>
        </li>
        <li className="sideBar-list-item">
            <SiGooglepodcasts/>
            <span>Podcasts</span>
        </li>
        <li className="sideBar-list-item">
            <TfiMicrophoneAlt/>
            <span>Artists</span>
        </li>
      </ul>
      <button className="sideBar-add-btn">
        <IoMdAdd/>
        <span>New Playlist</span>
      </button>
      <p className="sideBar-subTitle">My Playlist</p>
      <ul className="sideBar-list">
        <li className="sideBar-list-item">Starred Songs</li>
      </ul>
    </div>
  );
}
