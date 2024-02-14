
//Importaciones: 
import React, { useEffect, useState } from 'react'
import {connect} from 'react-redux'
import NavBar from '../../Views/NavBar/NavBar'
import { getAllVideogames, startLoading,stopLoading, getVideogamesByName } from '../../Redux/actions'

import loadingCar from '../../assets/police-car-82.gif'
import Cards from '../../components/Cards/Cards'
import Pagination from '../../components/Pagination/Pagination'
import FiltersAndOrder from '../../components/FiltersAndOrder/FiltersAndOrder'
import styles from './home.module.css'
import imageNoResults from '../../assets/marvel.gif'

const Home = (props) => {

    //traigo el estado videogames con todos los elementos extraidos de la api
    //loading: para esperar la respuesta de la información.
  const {videogames, loading, currentPage, paginate, setCurrentPage} = props
  console.log(loading);
  
  
//PAGINADO: SE DEFINE EL ESTADO CURRENTPAGE: PAGINA ACTUAL. pagina 1
// const [currentPage, setCurrentPage] = useState(1)

//LIMITE DE VIDEOGAMES POR PAGINA: 15
const [videogamesPerPage] = useState(15)

//Se calcula el indice final por ejemplo: pagina 1 endIndex = 15. pagina 2 endIndex 30.
const endIndex = currentPage * videogamesPerPage;

// calcula el indice inicial por ejemplo endIndex(15) - videoGamesPerPage(15) = 0 (pag 1 = 0-15)
const startIndex = endIndex - videogamesPerPage

/*
    Selección de videogames actuales: 
    se utiliza el método slice para seleccionar un subconjunto de videogames de la lista completa de videogames
    - startIndex y endIndex se utilizan como argumento para slice para obtener los videogames que se mostraran en la página actual
    
    EXTRA  slice: se utiliza para extraer una seccion de un array y devuelve un nuevo array con los elementos seleccionados
    array.slice(inicio, fin) - el slice no modifica el array original, sino que crea una copia

*/
const currentVideogames = videogames.slice(startIndex, endIndex)

/*
  Funcion de paginacion : se define la funcion paginate que toma un numero como argumento.
    - cuando se llama a esta funcion actualiza el estado de currentPage con el número de pagina proporcionado, lo que causa el renderizado y mostrará la página correspondiente.
*/

// const paginate = (pageNumber) => setCurrentPage(pageNumber)

 useEffect(()=>{
  
  startLoading()
props.getAllVideogames().finally(() => stopLoading())
 },[getAllVideogames, startLoading, stopLoading])


 //Primer renderizado de cards antes del redux
  // useEffect(()=>{
  //   const onSearch = async () =>{
  //     try {
  //       const response = await axios.get(`http://localhost:3001/videogames`)
  
  //       setVideogames(response.data)
  //     } catch (error) {
  //       console.error('Error al recibir la data')
  //     }
  //   }
  //   onSearch()
  // }, [])

  const noResults = videogames.length === 0 
  return (

  <div> 
      {loading ? (<img className={styles.imageGif} src={loadingCar} alt='loading'/>) : ( 
        <>
         <FiltersAndOrder
      page={setCurrentPage}/>

      
      <Cards videogames={currentVideogames}/>
      {noResults && (
                    <div>
                        <div className={styles.noResults}>
                        <h2>No se ha creado un videogame.</h2>
                        <img src={imageNoResults} alt="No se encontraron resultados" />

                        </div>
                    </div>
                )} 
      <Pagination
      currentPage={currentPage}
      videogamesPerPage={videogamesPerPage}
      totalVideogames={videogames.length}
      paginate={paginate}
      />
        </>
      )}
      
   
     
    </div>
  )
 }
 const mapStateToProps = (state) => ({
  videogames: state.videogames,
  loading: state.loading
 })
const mapDispatchToProps = {
  getAllVideogames,
  startLoading,
  stopLoading,
  getVideogamesByName
  
} 

export default connect(mapStateToProps, mapDispatchToProps)(Home)

