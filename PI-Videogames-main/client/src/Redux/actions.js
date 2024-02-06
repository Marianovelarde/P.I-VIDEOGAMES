import axios from 'axios'

export const START_LOADING = 'START_LOADING';
export const STOP_LOADING = 'STOP_LOADING';
export const GET_ALL_VIDEOGAMES = 'GET_ALL_VIDEOGAMES';
export const GET_VIDEOGAMES_BY_NAME = 'GET_VIDEOGAMES_BY_NAME';
export const GET_ALL_GENRES = 'GET_ALL_GENRES';
export const FILTER_BY_GENRES = 'FILTER_BY_GENRES';
export const ORDER_BY = 'ORDER_BY';
export const GET_VIDEOGAMES_BY_ID = 'GET_VIDEOGAMES_BY_ID'
export const PAGINATE = 'PAGINATE'
export const POST_VIDEOGAMES = 'POST_VIDEOGAMES'
export const GET_PLATFORMS = 'GET_PLATAFORMS'
export const FILTER_BY_SOURCE = "FILTER_BY_SOURCE"
export const FILTER_BY_GENRES_AND_SOURCE = 'FILTER_BY_GENRES_AND_SOURCE'


export const startLoading = () => {
    return {
      type: START_LOADING,
    };
  };
  
  export const stopLoading = () => {
    return {
      type: STOP_LOADING,
    };
  };

export const getAllVideogames =  (payload) => async (dispatch) => {
    try {
        dispatch(startLoading())
        const videogames = await axios.get('http://localhost:3001/videogames')
        const data = videogames.data
        dispatch({
            type: GET_ALL_VIDEOGAMES,
            payload: data
        })
    } catch (error) {
        console.error('Error al recibir información desde el servidor: ', error.message)
    } finally {
        dispatch((stopLoading()))
    }
}
export const paginate = () => {

}
export const getVideogamesByName = (name) => async (dispatch) => {
    try {
        const videoName = await axios.get(`http://localhost:3001/videogames?name=${name}`)
        const data = videoName.data 
        dispatch({
            type: GET_VIDEOGAMES_BY_NAME,
            payload: data
        })
    } catch (error) {
        console.error('Error al recibir información por nombre: ', error.message)
        alert('No hay videogames por ese nombre.')
    }
}
export const getVideogamesById = (id) => async (dispatch) => {
    try {
            const videogameById = await axios.get(`http://localhost:3001/videogames/${id}`)
            const data = videogameById.data
            console.log(data);
            dispatch({
                type: GET_VIDEOGAMES_BY_ID,
                payload: data
            })
    } catch (error) {
        console.error('Error al recibir información por ID')
    }
}
export const getGenres = () => async(dispatch) => {
    const ResponseGenres = await axios.get(`http://localhost:3001/genres`)
    const data = ResponseGenres.data
    dispatch({
        type: GET_ALL_GENRES,
        payload: data
    })
}

export const getPlatforms = () => async (dispatch) => {
    const responsePlatforms = await axios.get(`http://localhost:3001/plataforms`)
    const data = responsePlatforms.data
    dispatch({
        type: GET_PLATFORMS,
        payload: data
    })
}

export const postVideogames = (payload) => async dispatch => {

    try {
        const createVideogame = await axios.post(`http://localhost:3001/videogame`, payload)
        const data = createVideogame.data
        dispatch({
            type: POST_VIDEOGAMES,
            payload: data
        })    
    } catch (error) {
        console.error('Error al enviar la solicitud POST: ', error.message)
    }
    

}

export const filterByGenres = (genresName) => {
    
    return {
        
        type: FILTER_BY_GENRES,
        payload: genresName
    }
}
export const filterBySource = (source) => {
    return {
        type: FILTER_BY_SOURCE,
        payload: source
    }
}
export const filterByGenresAndSource = (selectedGenre, selectedSource) => {
    return {
        type: FILTER_BY_GENRES_AND_SOURCE,
        payload: { selectedGenre, selectedSource },
    };
};

export const orderBy = (order) => {
    return {
        type: ORDER_BY,
        payload: order

    }
}

