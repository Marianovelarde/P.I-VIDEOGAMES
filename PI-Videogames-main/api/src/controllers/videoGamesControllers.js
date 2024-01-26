const axios = require('axios')
require('dotenv').config()
const utils = require('../utils/getDataApi')
const {Videogame, Genres} = require('../db');
const { Sequelize, Op, iLike } = require('sequelize');

const {API_KEY} = process.env

function esUUID(id) {
    const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    return uuidRegex.test(id);
  }


  const getAllVideogames = async (req, res) => {
  try {
    const { name } = req.query; // Obtengo el parámetro de consulta 'name' de la solicitud

    let dataDb;

    if (name) {
      // Si se proporciona un nombre, busca en la base de datos y en la API solo los países con ese nombre
      dataDb = await Videogame.findAll({
        where: {
          nombre: {
            [Sequelize.Op.iLike]: `%${name}%`
          }
        },
        include: Genres,
      });
    } else {
      // Si no se proporciona un nombre, obtén todos los países de la base de datos y la API
      dataDb = await Videogame.findAll({
        include: Genres,
      });
    }

    let dataVideogamesApi = await utils.getDataApi();

    // Filtra los datos de la API que no están en la base de datos

    // const apiDataNotInDb = dataVideogamesApi.filter(apiVideogame => !dataDb.find(dbVideogame => dbVideogame.id === apiVideogame.id));

    // Combina los datos de la base de datos y la API filtrados
    const allData = dataDb.concat(dataVideogamesApi);

if(name) {
  const response = allData.filter((el) => el.name.toLowerCase().includes(name.toLowerCase()))
  if(response.length === 0) {
    return res.status(404).send(`${name} no encontrado`)
  }
  else {
    return res.status(200).send(response)
  }
}
  res.status(200).send(allData)
  } catch (error) {
    console.error('Error: ', error.message);
    res.status(500).json('Internal server error');
  }
};



const getVideogamesById = async (req, res) => {
    const { idVideogame } = req.params;

    try {
        if (esUUID(idVideogame)) {
            let dataDb = await Videogame.findByPk(idVideogame, {
                include: Genres
            });

            if (dataDb) {
                return res.json({
                    id: dataDb.id,
                    nombre: dataDb.nombre,
                    descripcion: dataDb.descripcion,
                    plataformas: dataDb.plataformas,
                    imagen: dataDb.imagen,
                    fecha_de_lanzamiento: dataDb.fecha_de_lanzamiento,
                    rating: dataDb.rating
                });
            } else {
                return res.status(404).send('No se encuentra videogames con ese id');
            }
        } else {
         
          
            const URL = `https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`;
            
            const apiResponse = await axios.get(URL);
            const gameDetails = apiResponse.data;

            // Extraer la información necesaria de la API
            const response = {
                id: gameDetails.id,
                nombre: gameDetails.name,
                descripcion: gameDetails.description,
                plataformas: gameDetails.platforms.map(p => p.platform.name),
                imagen: gameDetails.background_image,
                fecha_de_lanzamiento: gameDetails.released,
                rating: gameDetails.rating,
                genres: gameDetails.genres.map(genre => ({ name: genre.name }))
            };

            return res.json(response);
        }
    } catch (error) {
        console.error('Error ', error);
        return res.status(500).send('Error interno del servidor');
    }
};

const createVideogame = async (req, res) => {
    const {
        nombre,
        descripcion,
        plataformas,
        imagen,
        fecha_de_lanzamiento,
        rating,
        genres
        
    } = req.body;

    try {
        let gameCreate = await Videogame.create({
            nombre,
            descripcion,
            plataformas,
            imagen,
            fecha_de_lanzamiento,
            rating,
        });

        // Ahora, agregamos los géneros al nuevo Videogame creado
        if(genres && genres.length > 0) {
          await gameCreate.addGenres(genres)
        }
        res.status(201).send(gameCreate);
    } catch (error) {
        res.status(500).send('Error interno en el servidor');
        console.error('Error en la consola de create: ', error);
    }
};
module.exports = {
    getAllVideogames,
    getVideogamesById,
    createVideogame

}