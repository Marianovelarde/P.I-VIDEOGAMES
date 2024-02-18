import {createStore, applyMiddleware } from 'redux'

//Redux-thunk: permite escribir creadores de acciones que retornan una función en vez de un objeto de acción típico.
import {thunk} from 'redux-thunk';

import rootReducer from './reducer';



const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

export default store;