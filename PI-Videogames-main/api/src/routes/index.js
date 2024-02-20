const { Router } = require('express');
const multer = require('multer');
const path = require('path');
//Especifica la carpeta de destino
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const uploadDir = path.join(__dirname, '../../uploads');
      cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });

const upload = multer({ storage: storage });

const {getAllVideogames, 
    getVideogamesById, 
    createVideogame,
    deleteVideogame, 
     } = require('../controllers/videoGamesControllers');
     
     const {getAllGenres} = require('../controllers/genresControllers');
    
     const {getAllPlatforms} = require('../controllers/platformsControllers');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


//agregar la imagen a la base de datos


const router = Router();

// Configurar los routers
router.get('/videogames', getAllVideogames);
router.get('/videogames/:idVideogame', getVideogamesById);
router.post('/videogame', upload.single('imagen'), createVideogame);
router.get('/genres', getAllGenres);
router.get('/platforms', getAllPlatforms);
router.delete('/videogames/:id', deleteVideogame);

module.exports = router;
