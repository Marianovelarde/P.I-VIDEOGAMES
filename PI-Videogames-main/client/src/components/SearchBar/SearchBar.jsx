import React, { useState } from 'react'
import { getVideogamesByName, getAllVideogames, } from '../../Redux/actions'
import styles from './searchBar.module.css'
import { connect } from 'react-redux'

const SearchBar = (props) => {
  
    const [name, setName] = useState('')

    const handleChange = (e) => {
        const {value} = e.target
        setName(value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        props.getVideogamesByName(name)
        setName('')
    }

    return (

    <div className={styles.firstContainer}>
        <header >
            <form onSubmit={handleSubmit}>
                <input 
                type="text"
                placeholder='Search Videogame'
                value={name}
                onChange={handleChange} />
                <button className={styles.buttonIcon} type='submit'><i class="fa-solid fa-magnifying-glass"></i></button>
                
            </form>
        </header>
    </div>
  )
}

export default connect(null, {getVideogamesByName, getAllVideogames})(SearchBar)