import React from 'react'
import Card from '../Card/Card'
const Cards = (props) => {

    const {videogames} = props


  return (
    <div>
        {videogames.map((vg) => {
            return (
                <Card
                key={vg.id}
                name={vg.name}
                image={vg.image}
                genres={vg.genres}  
                />
            )
        })}
    </div>
  )
}

export default Cards