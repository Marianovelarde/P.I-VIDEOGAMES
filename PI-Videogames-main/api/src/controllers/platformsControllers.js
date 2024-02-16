const utils = require('../utils/getDataApi')
const axios = require('axios')
const getAllPlatforms = async (req,res) => {
    try {
        let platforms = await utils.getPlatforms()

        res.send(platforms)
    } catch (error) {
        res.status(500).send('Error al recibir información de plataformas', error.message)
        console.error('Error en platformsControllers:', error.message)
    }
}
module.exports = {getAllPlatforms}