import React, { useState } from 'react'
import { getVideogamesByName, getAllVideogames } from '../../Redux/actions'
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
    }

    const reset = () => {
        setName('')
        props.getAllVideogames()
    }

    return (

    <div>
        <header>
            <h1>Videogames P.I soy Henry.</h1>

            <form onSubmit={handleSubmit}>
                <input 
                type="text"
                placeholder='Search Videogame'
                value={name}
                onChange={handleChange} />
                <button type='submit'>Buscar</button>
                <button type='button' onClick={reset}>Reset</button>
            </form>
        </header>
    </div>
  )
}

export default connect(null, {getVideogamesByName, getAllVideogames})(SearchBar)