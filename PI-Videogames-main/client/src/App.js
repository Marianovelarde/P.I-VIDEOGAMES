
import './App.css';
import {Routes, Route} from 'react-router-dom'
import Home from '../src/components/Home/Home'
import LandingPage from '../src/components/LandingPage/LandingPage'


function App() {

  return (
    <div>
      
      <Routes>
        <Route
        path='/' element={<LandingPage/>}/>


        <Route
        path='/home'
        element={<Home/>}/>

      
      </Routes>
    </div>
  );
}

export default App;
