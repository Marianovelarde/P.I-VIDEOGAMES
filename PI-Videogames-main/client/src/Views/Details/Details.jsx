//Hacemos las importaciones correspondientes
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getVideogamesById, deleteVideogame } from '../../Redux/actions';
import cargador from '../../assets/police-car-82.gif';
import styles from './details.module.css';

const Details = (props) => {
  //Extraemos el id que está vinculado a la card seleccionada desde home

  const { id } = useParams();

  const navigate = useNavigate();

  const { details, getVideogamesById, loading, deleteVideogame } = props;
  
  const {nombre, descripcion, imagen, fecha_de_lanzamiento, rating, plataformas,genres} = details;

  const [isUuid, setIsUuid] = useState(false);
 

  useEffect(() => {
    getVideogamesById(id);
  }, []);

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
      alert('Videogame eliminado con éxito.')
      navigate('/home');
    } catch (error) {
      console.error('Error al eliminar el videojuego:', error);
    }
  };
  const createMarkup = () => {
    return { __html: descripcion };
};
const toHome = (e) => {
e.preventDefault()
navigate('/home')

}
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
          <h1>{nombre}</h1>

          {details &&  imagen && imagen.includes('https') ? (
           <img className={styles.imgDetail} src={imagen} alt={nombre} />
          ) : (
            <img className={styles.imgDetail} src={`http://localhost:3001/uploads/${imagen}`} alt={nombre} />)}

          {descripcion && descripcion.includes('<') ? (
            <div dangerouslySetInnerHTML={createMarkup()} />
          ) : (
            // Renderiza el texto plano si no viene en formato HTML
            <p>Descripción: {descripcion}</p>
          )}
          <p>Fecha de Lanzamiento: {fecha_de_lanzamiento}</p>
          <p>Rating: {rating}</p>
          <p>Plataformas: {plataformas && plataformas.join(', ')}</p>
          <p>Géneros: {genres && genres.map((genre) => genre.name).join(', ')}</p>

          {/* Renderiza los campos de actualización si el ID es un UUID */}
          {isUuid && (
            <>
             <button className={styles.buttonDetails} onClick={handleDelete}>Eliminar</button>
              {/* Agrega más campos de actualización según sea necesario */}

              
            </>
          )}

          
          
            <button onClick={(e) => toHome(e)} className={styles.buttonDetails}>Volver</button>
          
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
  deleteVideogame,
};

export default connect(mapStateToProps, mapDispatchToProps)(Details);
