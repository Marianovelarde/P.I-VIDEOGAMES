import React, { useEffect, useState } from 'react'

import {connect} from 'react-redux'
import loadingCar from '../../assets/police-car-82.gif'
import { getAllVideogames, startLoading,stopLoading } from '../../Redux/actions'

import Cards from '../Cards/Cards'
import Pagination from '../Pagination/Pagination'
import FiltersAndOrder from '../FiltersAndOrder/FiltersAndOrder'
import styles from './home.module.css'

const Home = (props) => {

  const {videogames, loading} = props
  console.log(loading);
  
  

const [currentPage, setCurrentPage] = useState(1)

const [videogamesPerPage] = useState(15)

const endIndex = currentPage * videogamesPerPage;

const startIndex = endIndex - videogamesPerPage

const currentVideogames = videogames.slice(startIndex, endIndex)

const paginate = (pageNumber) => setCurrentPage(pageNumber)

 useEffect(()=>{
  startLoading()
props.getAllVideogames().finally(() => stopLoading())
 },[getAllVideogames, startLoading, stopLoading])

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
  return (

  <div> 
      {loading ? (<img className={styles.imageGif} src={loadingCar} alt='loading'/>) : ( 
        <>
         <FiltersAndOrder
      page={setCurrentPage}/>

      
      <Cards videogames={currentVideogames}/>

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

