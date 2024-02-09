import React, { useState,useEffect } from 'react'
import { getVideogamesById, startLoading,stopLoading } from '../../Redux/actions'
import { connect} from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import cargador from '../../assets/police-car-82.gif'
import styles from './details.module.css'


const Details = (props) => {

  const {id} = useParams()
    
    const {details, getVideogamesById, startLoading, stopLoading, loading} = props
   
  console.log(loading);
    
  useEffect(() => {
    startLoading()
    getVideogamesById(id).finally(() => stopLoading())
   

   
  }, [id, getVideogamesById, startLoading, stopLoading]);

    const { nombre, descripcion, plataformas, imagen, fecha_de_lanzamiento, rating, genres } = details;

    const createMarkup = () => {
      return { __html: descripcion };
  };
    return (
      <div className={styles.detailsContainer}>
     {loading ? <img className={styles.imageGif} src={cargador} alt="cohete" /> : (
       
        <>
          <h1>{nombre}</h1>
          <img className={styles.imgDetail} src={imagen} alt={nombre} />
          {/* Renderiza HTML de la descripción */}
          <div dangerouslySetInnerHTML={createMarkup()} />
          <p>Fecha de Lanzamiento: {fecha_de_lanzamiento}</p>
          <p>Rating: {rating}</p>
          <p>Plataformas: {plataformas && plataformas.join(', ')}</p>
          <p>Géneros: {genres && genres.map((genre) => genre.name).join(', ')}</p>
        
          <Link to='/home'>
          <button>Volver</button>
          </Link>
        </>
      )}
     
    </div>
  );
};

const mapStateToProps  = (state) => ({
    details: state.details,
    loading: state.loading
    
})
const mapDispatchToProps = {
getVideogamesById,
startLoading,
stopLoading
}

export default connect(mapStateToProps, mapDispatchToProps)(Details)