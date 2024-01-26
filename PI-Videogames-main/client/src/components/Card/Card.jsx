import React from 'react';

const Card = (props) => {
    const { id, name, description, released, image, genres } = props;

    return (
        <div>
            <img src={image} alt={name} />
            <h2>{name}</h2>
            <div>
                <h2>Genres:</h2>
                {genres.map((genre, index) => (
                        <h3 key={index}>{genre.name}{index !== genres.length - 1 && ', '}</h3>
                    ))}
            </div>
        </div>
    );
};

export default Card;
