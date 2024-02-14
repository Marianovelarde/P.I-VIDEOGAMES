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



//Funcion para iniciar el Loading
export const startLoading = () => {
    return {
      type: START_LOADING,
    };
  };
//Función para detener el loading
  export const stopLoading = () => {
    return {
      type: STOP_LOADING,
    };
  };
//Función para mostrar todos los videogames
/*
  En esta función se utiliza el método currying (currificación) que su particularidad es una funcion que retorna otra funcion:
  1_ se define una funcion con un parámetro payload - esta funcion es una funcion async retorna una función
  2_ función retornada: getAllVideogames(dispatch): al llamar a getAllVideogames, se obtiene una función de retorno, esta función de retorno se llama con el argumento dispatch
  3_esta funcion que se devuelve cuando se llama a getAllVideogames. Toma como argumento a dispatch y se utiliza para enviar acciones al store de redux
  Dentro de esta función se envia una accion startLoading al store para indicar que se estan cargando los datos
  Ser realiza la solicitud a la api para obtener los videogames utilizando axios
  Una vez que se obtienen los datos, se envia la accion al store con el tipo GET_ALL_VIDEOGAMES y los datos obtenidos como carga util
  Si ocurre algun error durante la carga de datos se maneja con el bloque catch
  Finalmente si la solicitud tuvo exito o falló se envia una acción stopLoading al store para indicar que la carga ha terminado.
  El bloque finally se ejecutará independientemente de si hubo un error o no durante la obtención de datos.
  Se utiliza la técnica del retorno de funciones para poder acceder al store de redux a través del dispatch dentro de las funciones async que realiza la solicitud de datos. Al retornar una funcion que toma dispatch como argumento, podemos acceder a dispatch en el ambito de la funcion async y enviar acciones al store de redux desde alli
*/


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
        console.error('Error al recibir información desde el servidor: ', error.message);
    } finally {
        dispatch((stopLoading()));
    };
};

/*Función async getVideogamesByName: busca videogames por nombre en una api y envia los datos al store de redux
1_ la funcion toma como argumento a name, que es el nombre del videogame que se desea buscar
2_ retorna otra funcion con el argumento dispatch que se utiliza para enviar acciones al store de redux 
3_ solicitud get a la API con axios 
4_ se utiliza un bloque try catch 
 try: se realiza la solicitud get a la url  utilizando axios para buscar por nombre
 - los datos de respuesta se almacenan en data 
 5_ Se envian las acciones al store de redux 
 el tipo de accion es: GET_VIDEOGAME_BY_NAME y la carga util(payload) es data
 catch: manejo de errores en el caso de que la información no llegue
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
        console.error('Error al recibir información por nombre desde el servidor: ', error.message);
        alert('No hay videogames por ese nombre.');
    };
};

/*
    funcion Async getVideogameById: se utiliza para buscar en la API un videogame por identificación(id)
    y envia acciones al store de redux
    1_ la funcion toma como argumento id que será el que id que se desea buscar en la api
    2_ retorna una función con el argumento dispatch que será para enviar acciones al store de redux
    4_ bloque try catch:
    - solicitud get a la url especifica con axios
    - la respuesta es almacenada en la variable data
    - se envia al store de redux a través de dispatch el tipo de accion es GET_VIDEOGAMES_BY_ID
    - la carga util(payload) es data
catch: maneja los errores en caso de no recibirlos correctamente
    
*/
export const getVideogamesById = (id) => async (dispatch) => {
    try {
            const videogameById = await axios.get(`http://localhost:3001/videogames/${id}`);
            const data = videogameById.data;
            console.log(data);
            dispatch({
                type: GET_VIDEOGAMES_BY_ID,
                payload: data
            });
    } catch (error) {
        console.error('Error al recibir información de ID desde el servidor: ', error.message);
    };
}

/*
Función getGenres, función async para obtener los generos 
Objetivo: Mostrar la lista de todos los géneros en la API para que en el formulario se pueda seleccionar los que el usuario desee
1_ toma como argumento payload para luego enviar la carga util al store de redux
2_ retorna una funcion que toma dispatch como argumento para enviar las acciones al store de redux
3_ bloque try-catch
try: 
    - Se realiza una solicitud de tipo get a la url especifica, utilizando axios.get
    - luego la información recibida es guardada en data
    - Una vez que se recibe la respuesta se envia la accion al store de redux a través de dispatch:
    * la accion tiene un tipo GET_ALL_GENRES
    * los datos obtenidos se pasan como carga util(payload)
catch: 
        - Maneja los errores en el caso de no recibir correctamente la información
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
      console.error('Error al recibir información de  generos: ', error.message)  
    };
    
};
/*
    Funcion async getPlatforms
    objetivo: Obtener una lista de plataformas proveniente de la api, para luego mostrarlas en el formulario y que el usuario pueda elegir la que desee
1_ se declara la funcion async sin argumentos ni parametros
2_ se retorna una funcion con un argumento dispatch que es para enviar acciones al store de redux
3_ bloque try-catch
try: 
  - Se realiza una solicitud de tipo get a la url especifica, utilizando axios
  - La respuesta recibida se almacena en una variable data
  - se envia la accion de tipo GET_PLATFORMS al store de redux través del dispatch
  - los datos obtenidos(data) se envian en la carga útil(payload)
  catch: 
  - se maneja los errores con un console.error para obtener mas información sobre el error
  */

export const getPlatforms = () => async (dispatch) => {
    try {
        const responsePlatforms = await axios.get(`http://localhost:3001/plataforms`);
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
    Función async postVideogame
    Objetivo: Enviar la solicitud para crear un nuevo videogame
    1_ se crea la funcion async con el argumento payload
        - payload en este caso cotiene la información del videogame que se va a crear
    2_ La funcion retorna otra funcion con el arguento dispatch que enviara las acciones al store de redux
    3_ bloque try-catch
    try: 
        - se realiza una solicitu POST para crear un nuevo videogame, utilizando axios
            * se proporciona como segundo argumento payload para pasar los datos obtenidos
        - Se espera que la solicitud se complete y los datos creados se almacenan en la variable createVideogame
        - los datos especificos se almacenan en la variable data
        - Una vez obtenidos los datos se envia una accion de tipo POST_VIDEOGAME con una carga util de los datos obtenidos
    catch: 
        - si ocurre algun error se captura con el bloque catch
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
    función async deletevideogame
    objetivo: eliminar un videogame creado de la base de datos
    1_ la funcion toma como argumento id que es el id del videogame que se quiere eliminar
    2_ retorna una funcion con un argumento dispatch que es para enviar acciones al store de redux
    3_ bloque try-catch
    try: 
        - se utiliza una solicitud delete para eliminar un videogame por id, se usa axios
        - se envia la accion de tipo DELETE_VIDEOGAME al store de redux a través del dispatch
        - se pasa la carga util con la información del id
    catch: 
        - capta los errores en este bloque y los muestra en console.error
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
    función filterbyGenresAndSource: La función es una accion de redux utilizando action.creator
    objetivo: filtrar los videogames por genero y combinarlos con el filtrado por fuente
1_ se define la funcion y se pasa como argumento selectedGenre y segundo argumento selectedSource que recibira el nombre del genero el cual se desea filtrar
2_ retorna un objeto que representa una accion de redux
3_ el objeto tiene una accion de tipo FILTER_BY_GENRES, que indica al reducer como manejar esta acción
4_ el genero y la fuente seleccionadas se pasan como carga util(payload) 
 esta función es un "action creator" puro de Redux, que simplemente devuelve un objeto de acción estático.
*/
export const filterByGenresAndSource = (selectedGenre, selectedSource) => {
    return {
        type: FILTER_BY_GENRES_AND_SOURCE,
        payload: { selectedGenre, selectedSource },
    };
};

/*
    Funcion orderBy: funcion de tipo action creator: devuelve un objeto con una accion estatica para ordenar elementos de la lista
1_ se declara la funcion con un argumento order que representa el tipo de ordenamiento que se desea aplicar
2_ retorna un objeto que representa una accion de redux: ORDER_bY
3_ el tipo de ordenamiento(order) se pasa como carga util(payload)
*/
export const orderBy = (order) => {
    return {
        type: ORDER_BY,
        payload: order

    };
};

