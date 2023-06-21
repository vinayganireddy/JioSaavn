import React, { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearch } from "../redux/slice/searchResults";
import styles from "../styles/navbar.module.scss";

export default function Navbar() {
  const dispatch = useDispatch();
  const searchRes = useSelector((state) => state.Search.value);
  const [show, setShow] = useState(false);
  const handleSearch = (event) => {
    setShow(true);
    const searchTxt = event.target.value;
    if (searchTxt.length > 3) {
      dispatch(fetchSearch({ searchTxt, dispatch }));
    }
  };
    let searchKeys = [];
    if(searchRes) {
      searchKeys = Object.keys(searchRes.data);
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
      <div className={styles.search} onClick={() => setShow(false)}>
        <input
          type="text"
          className={styles.searchbox}
          placeholder="Search..."
          onChange={handleSearch}
        />
        {show && (
          <div className={styles.searchResults}>
            {searchRes && (
              <div>
                {searchKeys.length &&
                  searchKeys.map((e) => {
                    return (
                      <div>
                        <h3>{e}</h3>
                        {searchRes.data[e].results.map((e) => (
                          <div className={styles.searchResBar}>
                            <img
                              src={e.image[0].link}
                              className={styles.searchImg}
                            />
                            <p className={styles.searchResTxt}>{e.title}</p>
                          </div>
                        ))}
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        )}
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
