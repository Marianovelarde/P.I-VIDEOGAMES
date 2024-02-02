require('dotenv').config();

const {API_KEY} = process.env
const axios = require('axios')

//CREAMOS UNA FUNCIÓN PARA TRAER LA INFO DE LA API . 
//DEBE SER FUNCION ASINCRONA 
//LIMIT PER PAGE :LIMITE DE VIDEOGAMES POR PAGINA
//TOTAL DE VIDEOGAMES QUE QUIERO TRAER
//DIVIIDMOS EL TOTAL DE PAGINAS PO LA CANTIDAD DE VIDEOGAMES
//MATH CEIL: REDONDEA EL NUMERO DECIMAL AL NUMERO ENTERO SUPERIOR MAS PROXIMO.
//ARRAY VACIO PARA ALBERGAR LOS DATOS RECOPILADOS SEGÚN MIS CONDICIONES
const getDataApi = async () => {
    try {
        const limitPerPage = 20; //limite de videogames por pagina
        const totalGames = 100; //número total de videogames que deseo traer.
        const numPages = Math.ceil(totalGames / limitPerPage); //
        const allGamesDetails = [];

        //iniciamos page en 1 ya que queremos empezar de la primera pagina
        for (let page = 1; page <= numPages; page++) {
            const URL = `https://api.rawg.io/api/games?key=7758e5ff65454b6ab34b61287c1e829e&page=${page}`;
            
            const apiGames = await axios.get(URL); //hacemos la solicitud get a la url construida
            const gamesList = apiGames.data.results; //extraemos la lista de videogames

            const gamePromises = gamesList.map(async (game) => { //mapeo la lista de juegos y creo un array de promesas que representan la estructura que deseo
                const genres = game.genres.map(genre => ({ name: genre.name })); //extraigo el genero por nombre
             

                return {
                    id: game.id,
                    name: game.name,             
                    image: game.background_image,
                    genres,
                    rating: game.rating
                };
            });
                //aqui esperamos que se cumplan todas las promesas para continuar con la siguiente pag
            const gameDetails = await Promise.all(gamePromises);
            allGamesDetails.push(...gameDetails); //agrega los detalles de videogames al array
        }

        return allGamesDetails; //devolvemos el array
    } catch (error) {
        res.status(500).send
        console.error('Error obteniendo datos de la API : ', error);
       
    }
};

// Llamamos a la función para obtener los detalles de los juegos.
// getDataApi()
//     .then(data => console.log(data))
//     .catch(error => console.error(error));

const getDataApiGenres = async () => {
    try {
        let dataApi = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
        let response = dataApi.data.results.map((e) => {
            return {
                id: e.id,
                name: e.name
            }
        })
        return response

    } catch (error) {
        
    }
   
}

const getPlataforms = async (req,res) => {
    const apiPlataforms = await axios.get(`https://api.rawg.io/api/platforms/lists/parents?key=7758e5ff65454b6ab34b61287c1e829e`)
    const plataformsName = apiPlataforms.data.results.map(p => {
        return {
            id:p.id,
            name:p.name
        }
    })
    res.send(plataformsName)
}

module.exports = {
    getDataApi,
    getDataApiGenres,
    getPlataforms
}