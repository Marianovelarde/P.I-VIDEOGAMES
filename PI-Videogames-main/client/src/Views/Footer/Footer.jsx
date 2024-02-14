import React from 'react'
import styles from './footer.module.css'
const Footer = () => {
  return (
    <div>
        <section>
        <footer>
          <div className={styles.footerContainer}>
          <h3 >Mariano Nicolás, Velarde. Desarrollador Full Stack</h3>
          
          <a href="https://www.instagram.com/mnicolasvelarde/" target="_blank">
            <i class="fa-brands fa-instagram"></i>
          </a>
          
          <a href="https://twitter.com/mariano71464628" target="_blank">
            <i class="fa-brands fa-twitter"></i>
          </a>
          
          <a href="https://www.linkedin.com/in/mariano-velarde-fullstack" target="_blank">
            <i class="fa-brands fa-linkedin"></i>
          </a>
          <a href="https://github.com/Marianovelarde" target="_blank">
            <i class="fa-brands fa-github"></i>
          </a>
      </div>
     </footer>
    </section>
    </div>
  )
}

export default Footer