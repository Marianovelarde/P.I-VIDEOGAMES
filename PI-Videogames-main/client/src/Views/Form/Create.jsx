
import React, { useEffect } from 'react';
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { postVideogames, getGenres, getPlatforms } from '../../Redux/actions';
import styles from './create.module.css';


//Funcion para validar los campos 
const validate = (input) => {
      let errors = {};

    if(!input.nombre) {
      errors.nombre = 'El nombre es requerido';
    };
    if(!input.imagen) {
        errors.imagen = 'La imagen es obligatoria'
    };
  
    if(!input.descripcion) {
      errors.descripcion = 'La descripción es requerida'; 
    };
  
    if(!input.fecha_de_lanzamiento) {
      errors.fecha_de_lanzamiento = 'La fecha de lanzamiento es requerida';
    };
  
    if(input.rating <= 0 || input.rating > 5) {
      errors.rating = 'La clasificacion es requerida (1 Min - Max 5)';
    };
  
    if(input.plataformas.length === 0) {
      errors.plataformas = 'Debe seleccionar al menos una plataforma';
    };
  
    if(input.genres.length === 0) { 
      errors.genres = 'Debe seleccionar al menos un género';
    };
  
   
  
    return errors;
  };
   
const Create = () => {
    
    //UseNavigate para redireccionar a home
    const navigate = useNavigate();

    //Despachar accion 
    const dispatch = useDispatch();
    
    //traemos el estado genres y platforms
    const genres = useSelector((state) => state.genres);
    const platforms = useSelector((state) => state.platforms);
    const videogames = useSelector((state) => state.videogames);
    //variables de estado
    const [input, setInput] = useState({
    nombre: '',
    imagen: null,
    descripcion: '',
    plataformas: [],
    fecha_de_lanzamiento: '',
    rating: '',
    genres: []
    });

    //Variables de estado para errores
    const [errors, setErrors] = useState({});
    // eslint-disable-next-line
    const [duplicateVideoG , setDuplicateVideoG] = useState(false) 
    

    //Controlador de cambio para la imagen
    const handleImagenChange = (e) => {
        const file = e.target.files[0];
        setInput({
            ...input,
            imagen: file
        });
       
    };
    

useEffect(()=>{
    dispatch(getGenres())
    dispatch(getPlatforms())
    // eslint-disable-next-line
}, [input.plataformas, input.genres]);

//ejecuta la función validate(input) cada vez que el estado input cambia.
useEffect(() => {
    setErrors(validate(input));
}, [input]);

//Controlador de cambio
    const handleChange = (e) => {
        const { name, value  } = e.target;
        
            setInput({
                ...input,
                [name]: value,
            });
        
            setErrors(validate({
                ...input,
                [name]: value
            
            }));
        };

        //Controlador de cambio del select de plataformas
    const handleSelectPlatforms = (e) => {
        const {value} = e.target;
        if (value !== 'none' && !input.plataformas.includes(value)) {
            setInput({
              ...input,
              plataformas: [...input.plataformas, value],
            });
        
            setErrors({
              ...errors,
              plataformas: '', 
            });
          }
        };
        //Controlador de cambio del select genero
    const handleSelectgenres = (e) => {
        const { value } = e.target;
       
        if (value !== 'none' && !input.genres.includes(value)) {
            setInput({
              ...input,
              genres: [...input.genres, value],
            });
        
            setErrors({
              ...errors,
              genres: '', 
            });
          }
        };
        //función para eliminar una plataforma de la lista
    const handleRemovePlatform = (index) => {
        const newPlatforms = [...input.plataformas];
        newPlatforms.splice(index, 1);
        setInput({
            ...input,
            plataformas: newPlatforms,
        });
    };
    //Función para eliminar un  género de la lista
    const handleRemoveGenre = (index) => {
        const newGenres = [...input.genres];
        newGenres.splice(index, 1);
       
        setInput({
            ...input,
            genres: newGenres,
        });
    };
    //Controlador de envio del formulario
    const handleSubmit  = async (e) => {
        const {value,name} = e.target
        e.preventDefault()
        setErrors(validate({
            ...input,
            [name]: value
        })
        )
        //Obtenemos un array con las claves del objeto  y verificamos si hay error 
        if (Object.keys(errors).length === 0) {
                const formData = new FormData();
                formData.append('nombre', input.nombre);
                formData.append('descripcion', input.descripcion);
                formData.append('plataformas', JSON.stringify(input.plataformas));
                formData.append('genres', JSON.stringify(input.genres));
                formData.append('fecha_de_lanzamiento', input.fecha_de_lanzamiento);
                formData.append('rating', input.rating);
                formData.append('imagen', input.imagen);
                //console.log(formData.get('imagen'))

            //Verificar si el nombre del videogame ya existe
            const existingVideogame = videogames.find((game) => game.name === input.nombre)
            if(existingVideogame) {
                setDuplicateVideoG(true)
                alert('Ya existe un videogame con ese nombre.')
                return;
            };
            //Enviamos la solicitud al servidor 
            dispatch(postVideogames(formData));
            
            alert('Has creado un nuevo Videogame.',);
            setInput({
                nombre: '',
                descripcion: '',
                plataformas: [],
                fecha_de_lanzamiento: '',
                rating: '',
                genres: [],
                imagen: null
            });
            navigate('/home');
                 
        } else {
            alert('Completar los campos');
    };
};
    const orderPlatforms = platforms.sort((a,b) => a.name.localeCompare(b.name))
    const orderGenres = genres.sort((a,b) => a.name.localeCompare(b.name))
    
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
                 {errors.imagen && <p className={styles.warning}>{errors.imagen}</p>}

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
                <select onChange={(e)=> handleSelectPlatforms(e)}>
                    <option value='none'>none</option>
                    {orderPlatforms.map((pf)=>(
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
                    {orderGenres.map((genre) => (
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
                            <button type="button" onClick={() => handleRemoveGenre(index)}>
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
};

export default Create;