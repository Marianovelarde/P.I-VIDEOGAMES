import React, {  useState } from 'react';
import { getVideogamesByName, } from '../../Redux/actions';
import styles from './searchBar.module.css';
import { connect } from 'react-redux'
import { useNavigate } from 'react-router';



const SearchBar = (props) => {
    
    //navigate para dirigirnos hacía home
    const navigate = useNavigate();

    //estado local para obtener el valor del input
    const [name, setName] = useState('');

    
//controlador de cambio: 

    const handleChange = (e) => {
        const {value} = e.target
        setName(value)

    };
    //Controlador de envio

    const handleSubmit = (e) => {
        e.preventDefault()
        props.getVideogamesByName(name)
        setName('')
        navigate('/home')
      
    };
    

    return (

    <div className={styles.firstContainer}>
        <header >
            <form onSubmit={e => handleSubmit(e)}>
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