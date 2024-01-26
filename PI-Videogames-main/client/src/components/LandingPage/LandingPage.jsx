import React from 'react'
import { Link } from 'react-router-dom'
import styles from './landingPage.module.css'
const LandingPage = () => {
  return (
    <div className={styles.firstContainer}>
      <Link to='/home'>
        <button>Home</button>
      </Link>
    </div>
  )
}

export default LandingPage