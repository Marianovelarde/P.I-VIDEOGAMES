import React from 'react'
import notFound from '../../assets/404.jfif'
import  styles from './notFound.module.css'
const NotFound = () => {
  return (
    <div className={styles.notFound}>
        <h1>Error 404 not found</h1>
        <img src={notFound} alt="" />
    </div>
  )
}

export default NotFound