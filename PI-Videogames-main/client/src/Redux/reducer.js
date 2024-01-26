import { axios } from "axios"
import { 
    FILTER_BY_GENRES,
    GET_ALL_GENRES,
    GET_ALL_VIDEOGAMES,
    GET_VIDEOGAMES_BY_NAME,
    ORDER_BY} from "./actions"

const initialState = {
    videogames : [],
    copyVideogames : [],
    genres: []
}
const rootReducer =  (state = initialState, action)  => {

    switch (action.type) {
        case GET_ALL_VIDEOGAMES: 
        return {
            ...state,
            videogames: action.payload,
            copyVideogames: action.payload
        }
        case GET_VIDEOGAMES_BY_NAME: 
        return {
            ...state,
            videogames: action.payload
        }
        case GET_ALL_GENRES: 
        return {
            ...state,
            genres: action.payload
        }
        case FILTER_BY_GENRES:
    const allVideogames = state.copyVideogames;
    const selectedGenre = action.payload;

    const genresFiltered =
        selectedGenre === 'all'
            ? allVideogames
            : allVideogames.filter((el) =>
                  el.genres ? el.genres.some(genre => genre.name === selectedGenre) : false
            );
        
    return {
        ...state,
        videogames: genresFiltered
    };
    case ORDER_BY:
        const orderByType = action.payload;
        const currentVideogames = state.videogames.slice(); // Clona el array original
    
        switch (orderByType) {
            case 'videogameAsc':
                currentVideogames.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'videogameDesc':
                currentVideogames.sort((a, b) => b.name.localeCompare(a.name));
                break;
                case 'ratingAsc':
                    currentVideogames.sort((a, b) => (a.rating || 0) - (b.rating || 0));
                    break;
                case 'ratingDesc':
                    currentVideogames.sort((a, b) => (b.rating || 0) - (a.rating || 0));
                break;
            default:
                // No se especifica un tipo de orden, devolver el estado actual
                return state;
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