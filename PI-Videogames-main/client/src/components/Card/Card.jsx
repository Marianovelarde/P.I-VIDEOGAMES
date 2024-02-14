import React from 'react';
import { useNavigate } from 'react-router';
import {Link } from 'react-router-dom'
import styles from './card.module.css'
const Card = (props) => {


    //Extraemos los datos que nos llegan desde la lógica de cards
    const { id, name, imagen, genres } = props;

//Renderizamos en jsx lo que queremos mostrar
/*En img utilizo un Link para que me lleve para los detalles de la card. endPoint Id
  Mapeo el genero: 
    - lo devolvemos con un elemento p con la clave index para el numero de index
*/
    return (
        <div className={styles.containerCard}>

            <div className={styles.imgCard}>
                <Link to={`/videogames/${id}`}>
                {imagen.includes('http') ? ( // Verifica si la imagen es una URL externa
                        <img src={imagen} alt={name} />
                    ) : (
                        <img src={`http://localhost:3001/uploads/${imagen}`} alt={name} />
                    )}
                </Link>
            </div>
            <div className={styles.textCard}>
                <strong>{name}</strong>
                <br />
                <p><b>Genres: </b></p>
                {genres.map((genre, index) => (
                        <p key={index}>{genre.name}{index !== genres.length - 1 && ','}</p>
                    ))}
            </div>
                    {/*
                        En cada iteración, se recibe un objeto genre que representa un género del videojuego y el index que indica la posición del género en el array.
Se renderiza un párrafo <p> para cada género con el nombre del género genre.name.
Se asigna la clave key al párrafo para garantizar una identificación única para cada elemento en la lista. Se utiliza index como clave porque los géneros pueden no tener una propiedad única para usar como clave.
Después del nombre del género, se agrega una coma si el género actual no es el último en el array. Esto se hace con la expresión index !== genres.length - 1 && ','. Si el índice actual es diferente del último índice en el array, se agrega una coma después del nombre del género. Esto evita que se agregue una coma después del último género en la lista.
El resultado final es una lista de géneros renderizados en párrafos, separados por comas, si hay más de un género.
                    */}      
        </div>
    );
};

export default Card;
