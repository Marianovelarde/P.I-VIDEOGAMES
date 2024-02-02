
import { 
    GET_ALL_GENRES,
    GET_ALL_VIDEOGAMES,
    GET_VIDEOGAMES_BY_NAME,
    GET_VIDEOGAMES_BY_ID,
    GET_PLATFORMS ,
    FILTER_BY_GENRES,
    FILTER_BY_SOURCE,
    ORDER_BY,
    POST_VIDEOGAMES,} from "./actions"

const initialState = {
    videogames : [],
    copyVideogames : [],
    genres: [],
    details: [],
    platforms: []
}
const rootReducer =  (state = initialState, action)  => {
    console.log(state);
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
        case GET_VIDEOGAMES_BY_ID: 
        return {
            ...state,
            details: action.payload
        }

        case GET_ALL_GENRES: 
        return {
            ...state,
            genres: action.payload
        }
        case GET_PLATFORMS: 
        return {
            ...state,
            platforms: action.payload
        }
        case POST_VIDEOGAMES:
            return {
                ...state,
               
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

    case FILTER_BY_SOURCE: 
    let videogameBySource
     switch(action.payload){
        case 'all': 
        videogameBySource = state.copyVideogames
        break;
        case 'api': 
        videogameBySource = state.copyVideogames.filter((el) => typeof el.id === 'number')
        console.log('Filtro by api:', videogameBySource);
        break;
        case 'db':
        videogameBySource = state.copyVideogames.filter((el) => typeof el.id !== 'number')
        console.log('Filtro by Db: ',videogameBySource);
        break;
        default:
        videogameBySource = state.copyVideogames
    }
    return {
        ...state,
        videogames: videogameBySource
    }
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
                    currentVideogames.sort((a, b) => (a.rating) - (b.rating));
                    break;
                case 'ratingDesc':
                    currentVideogames.sort((a, b) => (b.rating) - (a.rating));
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