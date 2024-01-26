require('dotenv').config();

const {API_KEY} = process.env
const axios = require('axios')


const getDataApi = async () => {
    try {
        const limitPerPage = 20;
        const totalGames = 100; // Establecer el número total de juegos que deseas obtener.
        const numPages = Math.ceil(totalGames / limitPerPage);
        const allGamesDetails = [];

        for (let page = 1; page <= numPages; page++) {
            const URL = `https://api.rawg.io/api/games?key=7758e5ff65454b6ab34b61287c1e829e&page=${page}`;
            
            const apiGames = await axios.get(URL);
            const gamesList = apiGames.data.results;

            const gamePromises = gamesList.map(async (game) => {
                const genres = game.genres.map(genre => ({ name: genre.name }));
             

                return {
                    id: game.id,
                    name: game.name,             
                    image: game.background_image,
                    genres
                };
            });

            const gameDetails = await Promise.all(gamePromises);
            allGamesDetails.push(...gameDetails);
        }

        return allGamesDetails;
    } catch (error) {
        console.error('Error obteniendo datos de la API de RAWG: ', error);
       
    }
};

// Llamamos a la función para obtener los detalles de los juegos.
// getDataApi()
//     .then(data => console.log(data))
//     .catch(error => console.error(error));

const getDataApiGenres = async () => {
    let dataApi = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
    let response = dataApi.data.results.map((e) => {
        return {
            id: e.id,
            name: e.name
        }
    })
    return response
}

module.exports = {
    getDataApi,
    getDataApiGenres
}