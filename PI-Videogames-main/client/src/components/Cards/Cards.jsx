import React from 'react';
import Card from '../Card/Card';
import styles from './cards.module.css';
const Cards = (props) => {

    const {videogames} = props
//se recibe por props videogames (currentPage) 
//mapeamos  videogames y luego retornamos una card por cada elemento con la información necesaria.
  return (
    <div className={styles.cardsContainer}>
        {videogames.map((vg) => {
            return (
                <Card
                key={vg.id}
                id={vg.id}
                name={vg.name}
                imagen={vg.image}
                genres={vg.genres}
                rating={vg.rating}  
                />
            );
        })};
    </div>
  );
};

export default Cards;