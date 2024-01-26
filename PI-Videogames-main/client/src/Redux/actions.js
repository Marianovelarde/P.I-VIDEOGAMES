import axios from 'axios'

export const GET_ALL_VIDEOGAMES = 'GET_ALL_VIDEOGAMES'
export const GET_VIDEOGAMES_BY_NAME = 'GET_VIDEOGAMES_BY_NAME'
export const GET_ALL_GENRES = 'GET_ALL_GENRES'
export const FILTER_BY_GENRES = 'FILTER_BY_GENRES'
export const ORDER_BY = 'ORDER_BY'



export const getAllVideogames =  (payload) => async (dispatch) => {
    try {
        const videogames = await axios.get('http://localhost:3001/videogames')
        const data = videogames.data
        dispatch({
            type: GET_ALL_VIDEOGAMES,
            payload: data
        })
    } catch (error) {
        console.error('Error al recibir información desde el servidor: ', error.message)
    }
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

export const getGenres = () => async(dispatch) => {
    const ResponseGenres = await axios.get(`http://localhost:3001/genres`)
    const data = ResponseGenres.data
    dispatch({
        type: GET_ALL_GENRES,
        payload: data
    })
}

export const filterByGenres = (genresName) => {
    
    return {
        
        type: FILTER_BY_GENRES,
        payload: genresName
    }
}

export const orderBy = (order) => {
    return {
        type: ORDER_BY,
        payload: order

    }
}

