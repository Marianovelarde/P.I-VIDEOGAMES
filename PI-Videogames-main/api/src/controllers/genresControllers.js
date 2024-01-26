const utils = require('../utils/getDataApi')

const getAllGenres = async (req,res) => {
    
    try {
        let genresDataApi = await utils.getDataApiGenres()
        
        res.send(genresDataApi)
    } catch (error) {
        res.status(400).send('Error al recibir información sobre generos desde la api.')
        console.error('Error en getAllGenres :',error)
    }
}
module.exports = {
    getAllGenres
}