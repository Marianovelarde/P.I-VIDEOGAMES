import React, { useEffect, useState } from 'react'
import { getVideogamesByName, } from '../../Redux/actions'
import styles from './searchBar.module.css'
import { connect } from 'react-redux'



//componente para realizar la busqueda por nombre
/* Extraemos el props que nos traemos de mapdispatchToProps */
const SearchBar = (props) => {
    
    //navigate para dirigirnos hacía home
 

    //estado local para obtener el valor del input
    const [name, setName] = useState('')

    
//controlador de cambio: 
/* 
    extraemos el valor de event.target y seteamos el estado con el
*/
    const handleChange = (e) => {
        const {value} = e.target
        setName(value)

    }
    //Controlador de envio
    /*
        preventdefault para que no se actualice la pagina.
        llamamos a getVideoGamesById(name) con el valor name para enviarlo al action creator
        Seteamos el valor del estado
        
    */
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
                <button className={styles.buttonIcon} type='submit'><i className="fa-solid fa-magnifying-glass"></i></button>
                
            </form>
        </header>
    </div>
  )
}

export default connect(null, {getVideogamesByName})(SearchBar)