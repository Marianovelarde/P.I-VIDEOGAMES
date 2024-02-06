import  { useEffect, useState } from 'react'
import { 
    getAllVideogames,
    getGenres, 
    filterByGenres, 
    orderBy,
    filterBySource,
    filterByGenresAndSource } from '../../Redux/actions'
import { connect } from 'react-redux'
import styles from '../FiltersAndOrder/styledComponent.module.css'

const FiltersAndOrder = (props) => {

const {page} = props
//Botones/Opciones para filtrar por género, y por si su origen es de la API o de la base de datos (creados por nosotros desde el formulario).
// Botones/Opciones para ordenar tanto ascendentemente como descendentemente los videojuegos por orden alfabético y por rating.
    const [select, setSelect] = useState({
        filterByGenres: 'all',
        filterBySource: 'all',
        orderBy: 'orderNone'
    })
    
   

    useEffect(()=>{
        props.getGenres()
        props.filterBySource()
    },[])

    const handleFilterGender = (e) => {
        const {value} = e.target
        
        setSelect({
            ...select,
            filterByGenres: value
        })
        props.filterByGenresAndSource(value)
        page(1)
    }
    const handleSource = (e) => {
        const {value} = e.target
        console.log(value);
        setSelect({
          ...select,
          filterBySource: value,
        })
       
        page(1)
        props.filterByGenresAndSource(select.filterByGenres, value);    
    }

    const handleOrder = async (e) => {
        const { value } = e.target;    
        setSelect({
            ...select,
            orderBy: value
        });
    
        if (value === 'orderNone') {
            try {
                props.filterByGenresAndSource(select.filterByGenres, select.filterBySource)
            } catch (error) {
                console.error('Error en el ordenamiento: ', error.message);
            }
            page(1);
        } else {
            props.orderBy(value);
        }
        page(1);
    }

    
    const reset = () => {
        
        props.getAllVideogames()
    }

  return (
    <div className={styles.firstContainer}>
        <section className={styles.sectionFo}>
            <div>
                <p>filter By Genres</p>
                <select className={styles.selectContainer} name="filterByGenres" 
                value={select.filterByGenres} 
                onChange={e => handleFilterGender(e)}>
                    <option key='all' value='all'>all Genres</option>
                    {props.genres.map((item) => (
                    <option key={item.name} value={item.name}>{item.name}</option>
                    ))}
                </select>
            </div>
            <div>
                <p>Filter by Source</p>
                <select className={styles.selectContainer} name="filterBySource"
                value={select.filterBySource}
                onChange={(e) => handleSource(e)}>
                    <option value="all">All Videogames</option>
                    <option value="api">From Api</option>
                    <option value="db">From Db</option>
                </select>
            </div>
            <div>
                <p>Ordenar por:</p>
                <select className={styles.selectContainer} name="orderBy" value={select.orderBy} onChange={e => handleOrder(e)}>
                    <option value="orderNone">-</option>
                    <option value="videogameAsc">Videogames (A - Z)</option>
                    <option value="videogameDesc">Videogames (Z - A)</option>
                </select>
                <select className={styles.selectContainer} name="orderBy" value={select.orderBy} onChange={e => handleOrder(e)}>
                    <option value="orderNone">-</option>
                    <option value="ratingAsc">Rating asc</option>
                    <option value="ratingDesc">Rating desc</option>
                </select>
            <button className={styles.selectContainer} type='button' onClick={reset}>Reset</button>
            </div>
        </section>
    </div>
  )
}

const mapStateToProps = (state) =>({
    genres: state.genres
    
})

const mapDispatchToProps = {
    getGenres,
    filterByGenres,
    getAllVideogames,
    orderBy,
    filterBySource,
    filterByGenresAndSource
}

export default connect(mapStateToProps, mapDispatchToProps)(FiltersAndOrder)