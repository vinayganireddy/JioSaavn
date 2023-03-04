import React from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { fetchSearch } from "../redux/slice/searchResults";
import styles from "../styles/navbar.module.scss";

export default function Navbar() {
  const dispatch = useDispatch();
  const handleSearch = (event) => {
    const searchTxt = event.target.value;
    if(searchTxt.length > 3) {
      dispatch(fetchSearch({searchTxt,dispatch}));
    }
  }
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img
          className={styles.img}
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/JioSaavn_Logo.svg/1024px-JioSaavn_Logo.svg.png"
          alt="logo"
        />
        <p className={styles.link}>Music</p>
        <p className={styles.link}>Podcast</p>
        <p className={styles.link}>Go Pro</p>
      </div>
      <div className={styles.search}>
        <input
          type="text"
          className={styles.searchbox}
          placeholder="Search..."
          onChange={handleSearch}
        />
        <div className={styles.searchResults}>

        </div>
      </div>
      <div className={styles.links}>
        <p className={styles.language}>English</p>
        <p className={styles.profile}>
          <FaRegUserCircle className={styles.user} />
        </p>
      </div>
    </div>
  );
}
