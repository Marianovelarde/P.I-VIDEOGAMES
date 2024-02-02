
import React, { useEffect } from 'react'
import { useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { postVideogames, getGenres, getPlatforms } from '../../Redux/actions'

const validate = (input) => {
      let errors = {}
    if(!input.nombre) {
      errors.nombre = 'El nombre es requerido';
    }
  
    if(!input.descripcion) {
      errors.descripcion = 'La descripción es requerida'; 
    }
  
    if(!input.fecha_de_lanzamiento) {
      errors.fecha_de_lanzamiento = 'La fecha de lanzamiento es requerida';
    }
  
    if(input.rating <= 0 || input.rating > 10) {
      errors.rating = 'El rating es requerido (1 Min - Max 10)';
    }
  
    if(input.plataformas.length === 0) {
      errors.plataformas = 'Debe seleccionar al menos una plataforma';
    }
  
    if(input.genres.length === 0) { 
      errors.genres = 'Debe seleccionar al menos un género';
    }
  
   
  
    return errors
  }
   
const Create = (props) => {
    
    const dispatch = useDispatch()

    const genres = useSelector((state) => state.genres)
    const platforms = useSelector((state) => state.platforms)
    
    const [input, setInput] = useState({
    nombre: '',
    descripcion: '',
    plataformas: [],
    fecha_de_lanzamiento: '',
    rating: '',
    genres: []
    })
    
    const [errors, setErrors] = useState({})

    
useEffect(()=>{
    dispatch(getGenres())
    dispatch(getPlatforms())
}, [input.genres, input.plataformas])

    const handleChange = (e) => {
        const { name, value  } = e.target;
        
            setInput({
                ...input,
                [name]: value,
            });
        
            setErrors(validate({
                ...input,
                [name]: value
            
            }))
        }

    
    const handleSelectPlataforms = (e) => {
        const {value} = e.target
        if (value !== 'none' && !input.plataformas.includes(value)) {
            setInput({
              ...input,
              plataformas: [...input.plataformas, value],
            });
        
            setErrors({
              ...errors,
              plataformas: '', // Limpiamos el error cuando se selecciona una plataforma
            });
          }
        };

    const handleSelectgenres = (e) => {
        const { value } = e.target;
       
        if (value !== 'none' && !input.genres.includes(value)) {
            setInput({
              ...input,
              genres: [...input.genres, value],
            });
        
            setErrors({
              ...errors,
              genres: '', // Limpiamos el error cuando se selecciona un género
            });
          }
        };
    const handleRemovePlatform = (index) => {
        const newPlatforms = [...input.plataformas];
        newPlatforms.splice(index, 1);
        setInput({
            ...input,
            plataformas: newPlatforms,
        });
    };

    const handleRemoveGenre = (index) => {
        const newGenres = [...input.genres];
        newGenres.splice(index, 1);
        setInput({
            ...input,
            genres: newGenres,
        });
    };
    
    const handleSubmit  = async (e) => {
        const {value,name} = e.target
        e.preventDefault()
        setErrors(validate({
            ...input,
            [name]: value
        })
        )
        if (Object.keys(errors).length === 0) {
            const post = {
                nombre: input.nombre,
                imagen: input.imagen,
                descripcion: input.descripcion,
                plataformas: input.plataformas,
                fecha_de_lanzamiento: input.fecha_de_lanzamiento,
                rating: input.rating,
                genres: input.genres
            }
            dispatch(postVideogames(post))
            alert('Has creado un nuevo Videogame.')
            setInput({
                nombre: '',
                descripcion: '',
                plataformas: input.plataformas,
                fecha_de_lanzamiento: '',
                rating: '',
                genres: input.genres
            })
            
        } else {
            alert('Completar los campos')
    
    }
}

    return (
    <div>
        <section>
            <form onSubmit={(e) => handleSubmit(e)}>

                <h2>Creá tu videogame</h2>

                <p>nombre del videogame</p>
                {errors.nombre && <p>{errors.nombre}</p>}
                <input 
                type="text"
                name='nombre'
                value={input.nombre}
                placeholder='Nombre del videogame'
                onChange={(e) => handleChange(e)}
                 />
                 <p>descripcion</p>
                 {errors.descripcion && <span>{errors.descripcion}</span>}

                <input 
                type='text'
                name='descripcion'
                 value={input.descripcion}
                 onChange={(e) => handleChange(e)}/>

                 <p>Fecha de lanzamiento</p>
                 {errors.fecha_de_lanzamiento && <span>{errors.fecha_de_lanzamiento}</span>}
                 <input 
                 type="date"
                 name='fecha_de_lanzamiento'
                 value={input.fecha_de_lanzamiento}
                 onChange={(e) => handleChange(e)}
                  />
                  <p>Ratings</p>
                  {errors.rating && <span>{errors.rating}</span>}
                  <input 
                  type="number"
                  name='rating'
                  value={input.rating}
                  onChange={(e) => handleChange(e)}
                  />
                 <p>Plataformas</p>
                 {errors.plataformas && <span>{errors.plataformas}</span>}
                <select onChange={(e)=> handleSelectPlataforms(e)}>
                    <option value='none'>none</option>
                    {platforms.map((pf)=>(
                        <option key={pf.id} value={pf.name}>
                            {pf.name}
                        </option>
                    ))}
                </select>
                <ul>
                    {input.plataformas.map((i,index)=> (
                        <li key={index}>
                            {i}

                            <button type="button" onClick={() => handleRemovePlatform(index)}>
                                     Eliminar
                                </button>
                            </li>
                        
                    ))}
                </ul>
                  <p>Géneros</p>
                  {errors.genres && <span>{errors.genres}</span>}
                <select onChange={(e) => handleSelectgenres(e)}>
                  <option value='none'>none</option>
                    {genres.map((genre) => (
                        <option key={genre.id} value={genre.name}>
                            {genre.name}
                        </option>
                    ))}
                </select>
                <ul>
                    {input.genres.map((i, index) => (
                        <li key={index}>
                            {i}
                            <button type="button" onClick={() => handleRemoveGenre(index)}>
                                    Eliminar
                                </button>
                        </li>
                    ))}
                </ul>
                    <button type='submit'>Enviar</button>
            </form>
        </section>

    </div>
  )
}

export default Create