
import './App.css';
import { useState } from 'react';
import {Routes, Route, useLocation} from 'react-router-dom'
import Home from '../src/Views/Home/Home'
import LandingPage from '../src/Views/LandingPage/LandingPage'
import Details from './Views/Details/Details';
import NavBar from './Views/NavBar/NavBar';
import Create from './Views/Form/Create';
import About from './Views/About/About';
import Footer from './Views/Footer/Footer';
import NotFound from './Views/notFound/NotFound';

function App() {

//UseLocation: representa la pag actual
  const location = useLocation()

  //Estes variables de estados representan la pag actual 
  const [currentPage, setCurrentPage] = useState(1);
  
 
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  /*
      UTILIZAMOS APP  PARA RENDERIZAR LAS RUTAS . 
  */
  return (
    <div>
     
      {location.pathname !== '/'  &&
      <NavBar page={setCurrentPage}/>
      }

    <Routes>
      
        <Route
        path='/' element={<LandingPage/>}/>

        <Route
        path='/home'
        element={<Home currentPage={currentPage} paginate={paginate} setCurrentPage={setCurrentPage}/>}/>

        <Route 
        path="/videogames/:id" 
        element={<Details />} />

        <Route
        path='/create'
        element={<Create/>}/>

        <Route
        path='/about'
        element={<About/>}/>
      <Route path='*' element={<NotFound />} /> 
    </Routes>

    {location.pathname !== '/' && <Footer/>}
    </div>
  );
};

export default App;
