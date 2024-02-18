
import './index.css';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import App from './App';
//browserRouter conecta  nuestra app a la url
import {BrowserRouter} from 'react-router-dom';
// componente de orden superior proporcionado por React Redux que le permite asociar Redux a React
import { Provider } from 'react-redux';
//store: Representa el estado de la aplicación, es conocido dentro de Redux como “la única fuente de la verdad”

//importamos el store 
import store from './Redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
//conectamos el provider con el store
  <Provider store={store}>
  <BrowserRouter>
    <App />
  </BrowserRouter>

  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
