
import React, { useEffect } from 'react'
import { useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { postVideogames, getGenres, getPlatforms } from '../../Redux/actions'
import styles from './create.module.css'

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
    
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const genres = useSelector((state) => state.genres)
    const platforms = useSelector((state) => state.platforms)
    
    const [input, setInput] = useState({
    nombre: '',
    imagen: null,
    descripcion: '',
    plataformas: [],
    fecha_de_lanzamiento: '',
    rating: '',
    genres: []
    })

    const [errors, setErrors] = useState({})
    

    const handleImagenChange = (e) => {
        const file = e.target.files[0];
        setInput({
            ...input,
            imagen: file
        })
       
    };
useEffect(()=>{
    dispatch(getGenres())
    dispatch(getPlatforms())
}, [input.plataformas, input.genres])

useEffect(() => {
    setErrors(validate(input));
}, [input]);

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
        console.log(value);
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
        console.log(value);
       
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
                const formData = new FormData();
                formData.append('nombre', input.nombre)
                formData.append('descripcion', input.descripcion)
                formData.append('plataformas', JSON.stringify(input.plataformas));
                formData.append('genres', JSON.stringify(input.genres));
                formData.append('fecha_de_lanzamiento', input.fecha_de_lanzamiento)
                formData.append('rating', input.rating)
                
                formData.append('imagen', input.imagen)
                console.log(formData.get('imagen'))
                console.log(formData.get('genres'))
            dispatch(postVideogames(formData))
            console.log('formData2: ', input.plataformas,input.genres);
            alert('Has creado un nuevo Videogame.',)
            setInput({
                nombre: '',
                descripcion: '',
                plataformas: [],
                fecha_de_lanzamiento: '',
                rating: '',
                genres: [],
                imagen: null
            })
            navigate('/home')
                 
        } else {
            alert('Completar los campos')
    
    }
}

    return (
    <div className={styles.firstContainer}>
        <section>
            <form onSubmit={(e) => handleSubmit(e)} encType="multipart/form-data">
            <div className ={styles.formContainer}>
                <h2>Creá tu videogame</h2>
                <p>Nombre</p>
                <input 
                type="text"
                name='nombre'
                value={input.nombre}
                placeholder='Nombre del videogame'
                onChange={(e) => handleChange(e)}
                />
                {errors.nombre && <p className={styles.warning}>{errors.nombre}</p>}
                 
                 <p>Imagen</p>
                 <input type="file" name='imagen' onChange={e => handleImagenChange(e)}/>

                 <p>Descripcion</p>
                 <textarea
                 name='descripcion'
                value={input.descripcion}
                onChange={(e) => handleChange(e)}
                />
                {errors.descripcion && <p className={styles.warning}>{errors.descripcion}</p>}

                 <p>Fecha de lanzamiento</p>
                 <input 
                 type="date"
                 name='fecha_de_lanzamiento'
                 value={input.fecha_de_lanzamiento}
                 onChange={(e) => handleChange(e)}
                  />
                  {errors.fecha_de_lanzamiento && <p className={styles.warning}>{errors.fecha_de_lanzamiento}</p>}

                  <p>Ratings</p>
                  <input 
                  type="number"
                  name='rating'
                  value={input.rating}
                  onChange={(e) => handleChange(e)}
                  />
                  {errors.rating && <p className={styles.warning}>{errors.rating}</p>}

                 <p>Plataformas</p>
                <select onChange={(e)=> handleSelectPlataforms(e)}>
                    <option value='none'>none</option>
                    {platforms.map((pf)=>(
                        <option key={pf.id} value={pf.name}>
                            {pf.name}
                        </option>
                    ))}
                </select>
                {errors.plataformas && <p className={styles.warning}>{errors.plataformas}</p>}
                <ul className={styles.ulCombine}>
                    {input.plataformas.map((i,index)=> (
                        <li key={index}>
                            {i}

                            <button type="button" onClick={() => handleRemovePlatform(index)}>
                                     x
                                </button>
                            </li>
                        
                    ))}
                </ul>

                  <p>Géneros</p>
                <select onChange={(e) => handleSelectgenres(e)}>
                  <option value='none'>none</option>
                    {genres.map((genre) => (
                        <option key={genre.id} value={genre.name}>
                            {genre.name}
                        </option>
                    ))}
                </select>
                {errors.genres && <p className={styles.warning}>{errors.genres}</p>}
                <ul className={styles.ulCombine}>
                    {input.genres.map((i, index) => (
                        <li key={index}>
                            {i}
                            <button className={styles.buttonLi} type="button" onClick={() => handleRemoveGenre(index)}>
                                    x
                                </button>
                        </li>
                    ))}
                    <button type='submit'>Crear Videogame</button>
                </ul>
            </div>
            </form>
        </section>

    </div>
  )
}

export default Create