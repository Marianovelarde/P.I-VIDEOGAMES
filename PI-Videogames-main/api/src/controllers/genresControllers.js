const utils = require('../utils/getDataApi');

//Controlador de ruta genres
const getAllGenres = async (req,res) => {
    
    try {
        //Traemos la logica de la solicitud desde getDataApi
        let genresDataApi = await utils.getDataApiGenres();
        //Enviamos la respuesta 
        res.send(genresDataApi);
    } catch (error) {
        res.status(400).send('Error interno en el servidor y la solicitud no pudo ser procesada',);
        console.error('Error en getAllGenres :',error.message);
    };
};
module.exports = {
    getAllGenres
};