import React from 'react';

import styles from './navbar.module.css';
import SearchBar from '../../components/SearchBar/SearchBar'
import { Link } from 'react-router-dom';

const NavBar = (props) => {
  const {page} = props
  return (
    <div className={styles.containerNav}>
      <header>
        <div className={styles.searchBar}>
            <SearchBar page={page}/>
        </div>
        <h1>Videogames P.I soy Henry.</h1>
        <main>
          <div className={styles.menuControllers}>
            <input type="checkbox" id="menu-toggle" className={styles.menuToggle} />
            <label htmlFor="menu-toggle" className={styles.menuIcon}>
            <img width="49" height="49" src="https://img.icons8.com/external-prettycons-lineal-prettycons/49/external-videogame-technology-prettycons-lineal-prettycons.png" alt="external-videogame-technology-prettycons-lineal-prettycons"/>
            </label>
            <div className={styles.menuBackdrop}></div>
            <ul className={styles.menuList}>
              <Link className={styles.link} to='/home'>
                  <li>Home</li>
              </Link>
              <Link className={styles.link} to='/about'>
                  <li>About</li>
              </Link>
              <Link className={styles.link} to='/create'>
                  <li>Create</li>
              </Link>
            </ul>
          </div>
        </main>
      </header>
    </div>
  );
};

export default NavBar;
