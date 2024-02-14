import React from 'react'
import { Link } from 'react-router-dom'
import styles from './landingPage.module.css'
const LandingPage = () => {
  return (
    <div className={styles.firstContainer}>
      <h1>Welcome To henry Videogame</h1>
      <Link to='/home'>
        <button>Play</button>
      </Link>
    </div>
  )
}

export default LandingPage