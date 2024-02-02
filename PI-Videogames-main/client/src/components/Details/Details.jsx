import React, { useEffect } from 'react'
import { getVideogamesById } from '../../Redux/actions'
import { connect} from 'react-redux'
import { useParams } from 'react-router-dom'
import styles from './details.module.css'


const Details = (props) => {
  const {id} = useParams()
    
    const {details, getVideogamesById} = props
  

    
    useEffect(()=>{
        getVideogamesById(id)
    },[])

    const { nombre, descripcion, plataformas, imagen, fecha_de_lanzamiento, rating, genres } = details;

    const createMarkup = () => {
      return { __html: descripcion };
  };
    return (
      <div className={styles.detailsContainer}>
      <h1>{nombre}</h1>
      <img src={imagen} alt={nombre} />
      {/* Renderizar HTML de la descripción */}
      <div dangerouslySetInnerHTML={createMarkup()} />
      <p>Fecha de Lanzamiento: {fecha_de_lanzamiento}</p>
      <p>Rating: {rating}</p>
      <p>Plataformas: {plataformas && plataformas.join(', ')}</p>
      <p>Géneros: {genres && genres.map((genre) => genre.name).join(', ')}</p>
      </div>
  )
}

const mapStateToProps  = (state) => ({
    details: state.details
    
})
const mapDispatchToProps = {
getVideogamesById,
}

export default connect(mapStateToProps, mapDispatchToProps)(Details)