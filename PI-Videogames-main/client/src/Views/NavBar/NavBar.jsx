import React from 'react'
import styles from './navbar.module.css'
import SearchBar from '../../components/SearchBar/SearchBar'
const NavBar = () => {
  return (
    <div className={styles.containerNav}>
        

        <h1>Videogames P.I soy Henry.</h1>

        <SearchBar/>
    </div>
  )
}

export default NavBar