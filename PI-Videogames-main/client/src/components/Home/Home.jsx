import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import { getAllVideogames } from '../../Redux/actions'

import Cards from '../Cards/Cards'
import Pagination from '../Pagination/Pagination'

const Home = (props) => {

  const {videogames} = props
  // const [videogames, setVideogames] = useState([])
  

const [currentPage, setCurrentPage] = useState(1)

const [videogamesPerPage] = useState(15)

const endIndex = currentPage * videogamesPerPage;

const startIndex = endIndex - videogamesPerPage

const currentVideogames = videogames.slice(startIndex, endIndex)

const paginate = (pageNumber) => setCurrentPage(pageNumber)

 useEffect(()=>{
props.getAllVideogames()
 },[])
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
      <Pagination
      currentPage={currentPage}
      videogamesPerPage={videogamesPerPage}
      totalVideogames={videogames.length}
      paginate={paginate}
      />
      <Cards videogames={currentVideogames}/>
    </div>
  )
 }
 const mapStateToProps = (state) => ({
  videogames: state.videogames  
 })
const mapDispatchToProps = {
  getAllVideogames
} 

export default(connect)(mapStateToProps, mapDispatchToProps)(Home)

