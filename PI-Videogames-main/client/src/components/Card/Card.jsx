import React from 'react';
import {Link } from 'react-router-dom';
import styles from './card.module.css';
const Card = (props) => {


    //Extraemos los datos que nos llegan desde la lógica de cards
    const { id, name, imagen, genres, rating } = props;

    /*
    Renderizamos en jsx lo que queremos mostrar
    */
    return (
        <div className={styles.containerCard}>

            <div className={styles.imgCard}>
                <Link to={`/videogames/${id}`}>
                {imagen.includes('https') ? ( // Verifica si la imagen es una URL externa
                        <img src={imagen} alt={name} />
                    ) : (
                        <img src={`http://localhost:3001/uploads/${imagen}`} alt={name} />
                    )}
                </Link>
            </div>
            <div className={styles.textCard}>
                <strong> {name} </strong>
                <br />
                <p> <b>Genres: </b> </p>
                {genres.map((genre, index) => (
                        <p key={index}>{genre.name}{index !== genres.length - 1 && ', '}</p>
                    ))}
            </div>      
        </div>
    );
};

export default Card;
