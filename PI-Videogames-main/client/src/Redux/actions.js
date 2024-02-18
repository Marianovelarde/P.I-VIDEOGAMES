import axios from 'axios'
//exportaciones de las constantes ACTION TYPE
export const START_LOADING = 'START_LOADING';
export const STOP_LOADING = 'STOP_LOADING';
export const GET_ALL_VIDEOGAMES = 'GET_ALL_VIDEOGAMES';
export const GET_VIDEOGAMES_BY_NAME = 'GET_VIDEOGAMES_BY_NAME';
export const GET_ALL_GENRES = 'GET_ALL_GENRES';
export const ORDER_BY = 'ORDER_BY';
export const GET_VIDEOGAMES_BY_ID = 'GET_VIDEOGAMES_BY_ID';
export const POST_VIDEOGAMES = 'POST_VIDEOGAMES';
export const GET_PLATFORMS = 'GET_PLATAFORMS';
export const FILTER_BY_GENRES_AND_SOURCE = 'FILTER_BY_GENRES_AND_SOURCE';
export const DELETE_VIDEOGAME = 'DELETE_VIDEOGAME';



//Funcion action creators para iniciar el Loading
export const startLoading = () => {
    return {
      type: START_LOADING,
    };
  };

//Función action creator para detener el loading
  export const stopLoading = () => {
    return {
      type: STOP_LOADING,
    };
  };


//Función para solicitar  todos los videogames
export const getAllVideogames =  () => async (dispatch) => {
    try {
        dispatch(startLoading());
        const videogames = await axios.get('http://localhost:3001/videogames');
        const data = videogames.data;
        dispatch({
            type: GET_ALL_VIDEOGAMES,
            payload: data
        });
    } catch (error) {
        console.error('Error al recibir información de videogames desde el servidor.');
    } finally {
        dispatch(stopLoading());
    };
};

/*
    Función para solicitar una busqueda videogames por nombre 
*/


export const getVideogamesByName = (name) => async (dispatch) => {
    try {
        const videoName = await axios.get(`http://localhost:3001/videogames?name=${name}`);
        const data = videoName.data;
        dispatch({
            type: GET_VIDEOGAMES_BY_NAME,
            payload: data
        });
    } catch (error) {
        console.error('Error al recibir información por nombre desde el servidor. ');
        alert('No hay videogames por ese nombre.');
    };
};

/*
    Función para solicitar una  busqueda por id
*/
export const getVideogamesById = (id) => async (dispatch) => {
    try {
        dispatch(startLoading())
            const videogameById = await axios.get(`http://localhost:3001/videogames/${id}`);
            const data = videogameById.data;
           
            dispatch({
                type: GET_VIDEOGAMES_BY_ID,
                payload: data
            });
    } catch (error) {
        console.error('Error al recibir información de ID desde el servidor.');
    } finally {
        dispatch(stopLoading())
    };
};

/*
    Función getGenres para solicitar  la lista de los generos 
*/
export const getGenres = () => async(dispatch) => {
    try {
        const ResponseGenres = await axios.get(`http://localhost:3001/genres`);
        const data = ResponseGenres.data;
        dispatch({
            type: GET_ALL_GENRES,
            payload: data
        });    
    } catch (error) {
      console.error('Error al recibir información de  generos.')  
    };
    
};
/*
    Funcion para solicitar  la lista de plataformas
  */

export const getPlatforms = () => async (dispatch) => {

    try {
        const responsePlatforms = await axios.get(`http://localhost:3001/platforms`);
        const data = responsePlatforms.data;
  
        dispatch({
            type: GET_PLATFORMS,
            payload: data
        });
        
    } catch (error) {
        console.error('Error al recibir información de plataformas: ',error.message)
    };
};
/*
    Función para solicitar la  creacion de un videogame
*/
export const postVideogames = (payload) => async dispatch => {

    try {
        const createVideogame = await axios.post(`http://localhost:3001/videogame`, payload);
        const data = createVideogame.data;
        
        dispatch({
            type: POST_VIDEOGAMES,
            payload: data
        });
    } catch (error) {
        console.error('Error al enviar la solicitud POST: ', error.message);
    };
};
/*
    Funcion para solicitar la eliminación de un videogame por id
*/

export const deleteVideogame = (id) => async (dispatch) => {
    try {
         await axios.delete(`http://localhost:3001/videogames/${id}`);
       
        dispatch({
            type: DELETE_VIDEOGAME,
            payload: id
        });
    } catch (error) {
        console.error('Error al eliminar videogame ', error.message);
    };
};

/*
 Funcion para filtrar por generos y por fuente(funcion de tipo action creator)

*/
export const filterByGenresAndSource = (selectedGenre, selectedSource) => {
    return {
        type: FILTER_BY_GENRES_AND_SOURCE,
        payload: { selectedGenre, selectedSource },
    };
};

/*
  Funcion para ordenar la lista de videogames
*/
export const orderBy = (order) => {
    return {
        type: ORDER_BY,
        payload: order

    };
};

