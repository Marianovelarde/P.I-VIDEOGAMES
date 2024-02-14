//Hacemos las importaciones correspondientes
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getVideogamesById, startLoading, stopLoading, deleteVideogame } from '../../Redux/actions';
import cargador from '../../assets/police-car-82.gif';
import styles from './details.module.css';

const Details = (props) => {
  //Extraemos el id que está vinculado con la card seleccionada desde home
  const { id } = useParams();
  const navigate = useNavigate();

  const { details, getVideogamesById, startLoading, stopLoading, loading, deleteVideogame } = props;
  
  const [isUuid, setIsUuid] = useState(false);
 
//useEffect para montar el loading
  useEffect(() => {
    startLoading();
    getVideogamesById(id).finally(() => stopLoading());
  }, [id, getVideogamesById, startLoading, stopLoading]);

  useEffect(() => {
    // Verificamos si el ID es un UUID
    const esUUID = (id) => {
      const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
      return uuidRegex.test(id);
    };

    // Verifica si el ID actual es un UUID
    setIsUuid(esUUID(id));
  }, [id]);

  //Controlador para borrar videogame
  const handleDelete = async () => {
    try {
      await deleteVideogame(id);
      navigate('/home');
    } catch (error) {
      console.error('Error al eliminar el videojuego:', error);
    }
  };
/*
En los elementos jsx tenemos 3 cuestiones particulares 
1_ es el loading si el loading se encuentra en false: me muestra la imagen de cargando, si se el valor muestra true, me renderiza los detalles.
2_ condicionamos details.imagen && details.imagen.includes() para verificar si la fuente de la imagen proviene desde la api o bien desde uploads
3_ solamente si el tipo de id es uuid me mostrará el boton para eliminar
*/
  return (
    <div className={styles.detailsContainer}>
      {loading ? (
        <img className={styles.imageGif} src={cargador} alt="Cargando" />
      ) : (
        <>
          <h1>{details.nombre}</h1>

          {details && details.imagen && details.imagen.includes('http') ? (
           <img className={styles.imgDetail} src={details.imagen} alt={details.nombre} />
          ) : (
            <img className={styles.imgDetail} src={`http://localhost:3001/uploads/${details.imagen}`} alt={details.nombre} />
)}
          <p>Descripción: {details.descripcion}</p>
          <p>Fecha de Lanzamiento: {details.fecha_de_lanzamiento}</p>
          <p>Rating: {details.rating}</p>
          <p>Plataformas: {details.plataformas && details.plataformas.join(', ')}</p>
          <p>Géneros: {details.genres && details.genres.map((genre) => genre.name).join(', ')}</p>

          {/* Renderiza los campos de actualización si el ID es un UUID */}
          {isUuid && (
            <>
             <button onClick={handleDelete}>Eliminar</button>
              {/* Agrega más campos de actualización según sea necesario */}

              
            </>
          )}

          
          <Link to="/home">
            <button>Volver</button>
          </Link>
        </>
      )}
    </div>
  );
};
// traemos los estados desde el reducer: details y loading
const mapStateToProps = (state) => ({
  details: state.details,
  loading: state.loading,
});
//traemos las funciones de actions 
const mapDispatchToProps = {
  getVideogamesById,
  startLoading,
  stopLoading,
  deleteVideogame,
};

export default connect(mapStateToProps, mapDispatchToProps)(Details);
