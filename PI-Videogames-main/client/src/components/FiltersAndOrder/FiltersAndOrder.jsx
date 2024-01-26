import  { useEffect, useState } from 'react'
import { getGenres, filterByGenres, getAllVideogames,orderBy } from '../../Redux/actions'
import { connect } from 'react-redux'

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
    },[])

    const handleFilterGender = (e) => {
        const {value} = e.target
        console.log(value)
        setSelect({
            ...select,
            filterByGenres: value
        })
        props.filterByGenres(value)
        page(1)
    }

    const handleOrder = async (e) => {
        const { value } = e.target;
        console.log(value);
    
        setSelect({
            ...select,
            orderBy: value
        });
    
        if (value === 'orderNone') {
            try {
                props.getAllVideogames();
            } catch (error) {
                console.error('Error en el ordenamiento: ', error.message);
            }
            page(1);
        } else {
            props.orderBy(value);
        }
        page(1);
    }
  return (
    <div>
        <section>
            <div>
                <p>filter By Genres</p>
                <select name="filterByGenres" 
                value={select.filterByGenres} 
                onChange={e => handleFilterGender(e)}>
                    <option key='all' value='all'>all Genres</option>
                    {props.genres.map((item) => (
                    <option key={item.name} value={item.name}>{item.name}</option>
                    ))}
                </select>
            </div>
            <div>
                <p>Ordenar por:</p>
                <select name="orderBy" value={select.orderBy} onChange={e => handleOrder(e)}>
                    <option value="orderNone">-</option>
                    <option value="videogameAsc">Videogames (A - Z)</option>
                    <option value="videogameDesc">Videogames (Z - A)</option>
                </select>
                <select name="orderBy" value={select.orderBy} onChange={e => handleOrder(e)}>
                    <option value="orderNone">-</option>
                    <option value="ratingAsc">Rating asc</option>
                    <option value="ratingDesc">Rating desc</option>
                </select>
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
    orderBy
}

export default connect(mapStateToProps, mapDispatchToProps)(FiltersAndOrder)