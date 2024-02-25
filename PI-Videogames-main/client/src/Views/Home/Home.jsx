
//Importaciones: 
import React, { useEffect } from 'react';
import {connect} from 'react-redux';
import { getAllVideogames, startLoading,stopLoading } from '../../Redux/actions';
import Cards from '../../components/Cards/Cards';
import Pagination from '../../components/Pagination/Pagination';
import FiltersAndOrder from '../../components/FiltersAndOrder/FiltersAndOrder';
import styles from './home.module.css';
import loadingCar from '../../assets/police-car-82.gif';
import imageNoResults from '../../assets/marvel.gif';


const Home = (props) => {

  
  const {videogames, loading, currentPage, paginate, setCurrentPage} = props;
  
  



const videogamesPerPage = 15;

//Se calcula el indice final 
const endIndex = currentPage * videogamesPerPage;

// calcula el indice inicial
const startIndex = endIndex - videogamesPerPage;

/*
    se utiliza el método slice para seleccionar un subconjunto de videogames de la lista completa de videogames

*/
const currentVideogames = videogames.slice(startIndex, endIndex)



 useEffect(()=>{
    props.getAllVideogames()
    // eslint-disable-next-line
 },[]);


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

  const noResults = videogames.length === 0;

  return (

  <div> 
      {loading ? (<img className={styles.imageGif} src={loadingCar} alt='Empty'/>) : ( 
        <>
         <FiltersAndOrder
      page={setCurrentPage}/>

      
      <Cards videogames={currentVideogames}/>
      
      {noResults && (
                    <div>
                        <div className={styles.noResults}>
                        <h2>No hay videogame para mostrar.</h2>
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
  stopLoading
  
  
} 

export default connect(mapStateToProps, mapDispatchToProps)(Home)

