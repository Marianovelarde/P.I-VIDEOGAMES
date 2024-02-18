require('dotenv').config();

const {API_KEY} = process.env;
const axios = require('axios');


//LIMIT PER PAGE: LIMITE DE VIDEOGAMES POR PAGINA
//TOTALGAMES: CANTIDAD VIDEOGAMES QUE QUIERO TRAER
//NUMPAGES: DIVIDIMOS EL TOTAL DE PAGINAS PO LA CANTIDAD DE VIDEOGAMES
//MATH CEIL: REDONDEA EL NUMERO DECIMAL AL NUMERO ENTERO SUPERIOR MAS PROXIMO.
//ARRAY VACIO PARA ALBERGAR LOS DATOS RECOPILADOS SEGÚN MIS CONDICIONES
const getDataApi = async () => {
    try {
        const limitPerPage = 20; 
        const totalGames = 100; 
        const numPages = Math.ceil(totalGames / limitPerPage); 
        const allGamesDetails = [];

        //inicia page en 1 ya que queremos empezar de la primera pagina
        for (let page = 1; page <= numPages; page++) {
            const URL = `https://api.rawg.io/api/games?key=7758e5ff65454b6ab34b61287c1e829e&page=${page}`;
            
            const apiGames = await axios.get(URL); // solicitud get a la url construida
            const gamesList = apiGames.data.results; //se extrae la lista de videogames

            const gamePromises = gamesList.map(async (game) => { //mapeo la lista de juegos
                const genres = game.genres.map(genre => ({ name: genre.name })); //extraigo el genero por nombre
             
                //devuelvo la información que necesito extraer de la api
                return {
                     id: game.id,
                    name: game.name,             
                    image: game.background_image,
                    genres,
                    rating: game.rating
                };
            });
                // esperar a que se cumplan todas las promesas debido a que se hacen múltiples solicitudes 
            const gameDetails = await Promise.all(gamePromises);
            allGamesDetails.push(...gameDetails); //agrega los detalles de videogames al array allGamesDetails
        }

        return allGamesDetails; //devolvemos el array
    } catch (error) {
        res.status(500).send('Error interno en el servidor y la solicitud no pudo ser procesada')
        console.error('Error al obtener datos de la API : ', error.message);
       
    };
};


const getDataApiGenres = async () => {
    //controlador para solicitar la información de los géneros
    try {
        let dataApi = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
        let response = dataApi.data.results.map((e) => {
            return {
                id: e.id,
                name: e.name
            };
        });
        return response;

    } catch (error) {
        res.status(500).send;
        console.error('Error al obtener datos generos de la api: ', error.mesage);
    };
   
};

//Controlador para solicitar información de plataformas
const getPlatforms = async (req,res) => {
    try {
            let apiPlatforms = await axios.get(`https://api.rawg.io/api/platforms/lists/parents?key=7758e5ff65454b6ab34b61287c1e829e`);
            let platformsName = apiPlatforms.data.results.map(p => {
                return {
                    id:p.id,
                    name:p.name
                }
            });

            return platformsName;
        
    } catch (error) {
        res.status(500).send('Error al obtener datos de plataforma desde la api: ', error.message);
        console.error('Error al obtener lista de plataformas desde getDataApi: ', error.message);
    };
   
};

module.exports = {
    getDataApi,
    getDataApiGenres,
    getPlatforms
};