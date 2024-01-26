import axios from 'axios'

export const GET_ALL_VIDEOGAMES = 'GET_ALL_VIDEOGAMES'




export const getAllVideogames =  (payload) => async (dispatch) => {
    try {
        const response = await axios.get('http://localhost:3001/videogames')
        const data = response.data
        console.log('Data: ', data);
        dispatch({
            type: GET_ALL_VIDEOGAMES,
            payload: data
        })
    } catch (error) {
        console.error('Error al recibir información desde el servidor: ', error.message)
    }
}