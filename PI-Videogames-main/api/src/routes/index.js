const { Router } = require('express');

const {getAllVideogames, 
    getVideogamesById, 
    createVideogame} = require('../controllers/videoGamesControllers')

const {getAllGenres} = require('../controllers/genresControllers')

const {getPlataforms} = require('../utils/getDataApi')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


//agregar la imagen a la base de datos


const router = Router();

// Configurar los routers
router.get('/videogames', getAllVideogames)
router.get('/videogames/:idVideogame', getVideogamesById)
router.post('/videogame', createVideogame)
router.get('/genres', getAllGenres)
router.get('/plataforms', getPlataforms)


module.exports = router;
