const { Router } = require('express');
const {getAllVideogames, 
    getVideogamesById, 
    createVideogame} = require('../controllers/videoGamesControllers')

const {getAllGenres} = require('../controllers/genresControllers')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
router.get('/videogames', getAllVideogames)
router.get('/videogames/:idVideogame', getVideogamesById)
router.post('/videogame', createVideogame)
router.get('/genres', getAllGenres)


module.exports = router;
