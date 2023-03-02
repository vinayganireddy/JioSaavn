import React from "react";
import { FaRegUserCircle } from "react-icons/fa";

import styles from "../styles/navbar.module.scss";

export default function Navbar() {
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
        />
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
