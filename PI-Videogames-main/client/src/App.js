
import './App.css';
import {Routes, Route} from 'react-router-dom'
import Home from '../src/components/Home/Home'
import LandingPage from '../src/components/LandingPage/LandingPage'
import Details from './components/Details/Details';
import NavBar from './Views/NavBar/NavBar';
import Create from './Views/Form/Create';
function App() {

  /*UTILIZAMOS APP UNICAMENTE PARA RENDERIZAR LAS RUTAS . 
  SEARCHBAR  NAVBAR DEBEN ESTAR SIEMPRE RENDERIZADAS, INDEPENDIENTEMENTE DE LA RUTA EN LA QUE ESTEMOS.
  DOS ELEMENTOS INDISPENSABLES EN LAS RUTAS: PATH Y ELEMENT
  PATH: LA URL A LA QUE NOS REFERIMOS 
  ELEMENT: EL COMPONENTE QUE SE RENDERIZARÁ*/
  return (
    <div>
      <NavBar/>
    <Routes>
      
        <Route
        path='/' element={<LandingPage/>}/>

        <Route
        path='/home'
        element={<Home/>}/>

        <Route 
        path="/videogames/:id" 
        element={<Details />} />

        <Route
        path='/create'
        element={<Create/>}/>
      
    </Routes>
    </div>
  );
}

export default App;
