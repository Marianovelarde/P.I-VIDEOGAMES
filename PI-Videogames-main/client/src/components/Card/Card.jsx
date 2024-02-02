import React from 'react';
import { useNavigate } from 'react-router';
import {Link } from 'react-router-dom'
import styles from './card.module.css'
const Card = (props) => {
    const { id, name, description, released, image, genres } = props;

    
    
    const navigate = useNavigate()
    
    const handleClick = () => {
        navigate(`/videogames/${id}`)
    }
    return (
        <div className={styles.containerCard}>
            <div className={styles.imgCard}>
                <Link to={`/videogames/${id}`}>
                <img src={image} alt={name} />
                </Link>
            </div>
            <div className={styles.textCard}>
                <strong>{name}</strong>
                {genres.map((genre, index) => (
                        <p key={index}>{genre.name}{index !== genres.length - 1 && ','}</p>
                    ))}
            </div>

      
        </div>
    );
};

export default Card;
