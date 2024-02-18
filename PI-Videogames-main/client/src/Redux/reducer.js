//Importamos las acciones
import {
    START_LOADING,
    STOP_LOADING,
    GET_ALL_GENRES,
    GET_ALL_VIDEOGAMES,
    GET_VIDEOGAMES_BY_NAME,
    GET_VIDEOGAMES_BY_ID,
    GET_PLATFORMS,
    FILTER_BY_GENRES_AND_SOURCE,
    ORDER_BY,
    POST_VIDEOGAMES,
    DELETE_VIDEOGAME,
    } from "./actions";

//Declaramos initial state con nuestros estados
const initialState = {
    videogames : [],
    copyVideogames : [],
    genres: [],
    details: [],
    platforms: [],
    loading: false
};
const rootReducer =  (state = initialState, action)  => {

    switch (action.type) {
        case GET_ALL_VIDEOGAMES: 
        return {
            ...state,
            videogames: action.payload,
            copyVideogames: action.payload,
            
        };

        case GET_VIDEOGAMES_BY_NAME: 
        return {
            ...state,
            videogames: action.payload,
            copyVideogames: action.payload
        };

        case GET_VIDEOGAMES_BY_ID: 
        return {
            ...state,
            details: action.payload
        };

        case GET_ALL_GENRES: 
        return {
            ...state,
            genres: action.payload
        };

        case GET_PLATFORMS: 
        return {
            ...state,
            platforms: action.payload
        };

        case POST_VIDEOGAMES:
            return {
                ...state,
                videogames: [...state.videogames, action.payload]    
            };
        
            case DELETE_VIDEOGAME:
                // Filtramos los videogames para excluir el que se seleccionó 
                const updatedVideogames = state.videogames.filter((videogame) => videogame.id !== action.payload);
                return {
                  ...state,
                  videogames: updatedVideogames,
                };
            
              
        case START_LOADING: 
            return {
                ...state,
                loading: true
        };

        case STOP_LOADING: 
            return {
                ...state,
                loading: false
            };
            
            case FILTER_BY_GENRES_AND_SOURCE:
                const allVideogames = state.copyVideogames;
                const { selectedGenre, selectedSource } = action.payload;
                const filteredVideogames =
                    selectedGenre === 'all'
                        ? allVideogames
                        : allVideogames.filter((el) =>
                        el.genres ? el.genres.some(genre => genre.name === selectedGenre) : false
                        );
                const videogamesFilteredBySource =
                    selectedSource === 'all'
                        ? filteredVideogames
                        : selectedSource === 'api'
                        ? filteredVideogames.filter((el) => typeof el.id === 'number')
                        : selectedSource === 'db'
                        ? filteredVideogames.filter((el) => typeof el.id !== 'number')
                        : filteredVideogames;
            
                return {
                    ...state,
                    videogames: videogamesFilteredBySource
                };
            
    case ORDER_BY:
        const orderByType = action.payload;
        const currentVideogames = state.videogames.slice(); 
        switch (orderByType) {
            case 'videogameAsc':
                currentVideogames.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'videogameDesc':
                currentVideogames.sort((a, b) => b.name.localeCompare(a.name));
                break;
                case 'ratingAsc':
                    currentVideogames.sort((a, b) => (b.rating) - (a.rating));
                    break;
                    case 'ratingDesc':
                        currentVideogames.sort((a, b) => (a.rating) - (b.rating));
                break;
                case 'orderNone': 
                return {
                    ...state,
                    
                }
                
            default:
                // No se especifica un tipo de orden, devolver el estado actual
                return  state
        }
        return {
            ...state,
            videogames: currentVideogames
        }
default:
    return state;
}

}

export default rootReducer