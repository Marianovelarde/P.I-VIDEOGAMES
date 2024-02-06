const axios = require('axios')
require('dotenv').config()
const utils = require('../utils/getDataApi')
const {Videogame, Genres} = require('../db');
const { Sequelize, Op, iLike } = require('sequelize');

const {API_KEY} = process.env

// Un UUID es un identificador único; personalmente lo uso para generar cadenas aleatorias y criptográficamente seguras.
//esta función valida si una cadena sigue el formato uuid
  const esUUID = (id) =>{
    const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    return uuidRegex.test(id);
  }

  //mostrar la información extraida de la api y de la base de datos
  const getAllVideogames = async (req, res) => {
    try {
      //Extraemos el nombre 
      const { name } = req.query;
  
      // Variable vacía para trabajar con la base de datos
      let dataDb;
  
     /*
        Obtener videogame de la base de datos que coincida con el nombre
        Incluir información sobre los géneros
        Mapear los resultados para formatear la respuesta 
     */
      if (name) {
        dataDb = await Videogame.findAll({
          where: {
            nombre: {
              [Sequelize.Op.iLike]: `%${name}%`
            }
          },
          include: Genres,
        });
        dataDb = dataDb.map((vg) => ({
          id: vg.id,
          name: vg.nombre,
          image: vg.imagen,
          genres: Array.isArray(vg.genres) ? vg.genres.map((i) => ({ name: i.nombre })) : [],
        }));
      } else {
        /*
        obtener todos los videogames de la base de datos
        
        */
        dataDb = await Videogame.findAll({
          include: Genres,
        });
        //Información que debe renderizarse
        dataDb = dataDb.map((vg) => ({
          id: vg.id,
          name: vg.nombre,
          image: vg.imagen,
          genres: Array.isArray(vg.genres) ? vg.genres.map((i) => ({ name: i.nombre })) : [],
        }));
      }
  
      // Traigo la información de la API para la búsqueda y la concateno con la base de datos.
      let dataVideogamesApi;
  
      // Si no se proporciona un nombre, obtengo todos los videojuegos de la API
      if (!name) {
        dataVideogamesApi = await utils.getDataApi();
        //si se proporciona nombre se busca en la url 
      } else {
        const dataByName = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=15&search=${name}`);
        dataVideogamesApi = dataByName.data.results.map((game) => {
          const genres = game.genres.map((genre) => ({ name: genre.name }));
          return {
            id: game.id,
            name: game.name,
            image: game.background_image,
            genres,
            rating: game.rating,
          };
        });
      }
  
      // Combina los datos de la base de datos y la API filtrados
      const allData = dataDb.concat(dataVideogamesApi);
  
      //si llega por nombre filtramos la información . 
      if (name) {
        const response = allData.filter((el) => el.name.toLowerCase().includes(name.toLowerCase()));
  
        if (response.length === 0) {
          return res.status(404).send(`${name} no encontrado`);
        } else {
          return res.status(200).send(response);
        }
      }
      res.status(200).send(allData);
    } catch (error) {
      console.error('Error: ', error.message);
      res.status(500).json('Internal server error');
    }
  };
  


const getVideogamesById = async (req, res) => {
//extraemos el id
    const { idVideogame } = req.params;
  //verificamos si es identificador unico universal para la info de la bdd

    try {
        if (esUUID(idVideogame)) {
            let dataDb = await Videogame.findByPk(idVideogame, {
                include: Genres
            });
              //si hay informacion, que la muestre
            if (dataDb) {
                return res.json({
                    id: dataDb.id,
                    name: dataDb.nombre,
                    description: dataDb.descripcion,
                    platformas: dataDb.plataformas.map(pf => pf),
                    imagen: dataDb.imagen,
                    fecha_de_lanzamiento: dataDb.fecha_de_lanzamiento,
                    rating: dataDb.rating,
                    genres: Array.isArray(dataDb.genres) ? dataDb.genres.map((i) => ({ name: i.nombre })) : []
                });
            } else {
                return res.status(404).send('No se encuentra videogames con ese id');
            }
        } else {
          //si no hay un id que coincida con la info de la base de datos entonces busco la info en la api
          //end point para buscar por id
            const URL = `https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`;
            
            //hago una peticion get a la url y extraigo la data
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
//Funcion para crear información: 
//recibimos datos que serán ingresados desde el form
const createVideogame = async (req, res) => {
    const {
        nombre,
        descripcion,
        plataformas,
        fecha_de_lanzamiento,
        rating,
        genres } = req.body;

// los guardamos en la base de datos
    try {
        let gameCreate = await Videogame.create({
            nombre,
            imagen: `https://i.pinimg.com/736x/18/1e/3a/181e3a72fa1c42015be6bf2603260dfa.jpg`,
            descripcion,
            plataformas,
            fecha_de_lanzamiento,
            rating,
        });

        // Ahora, agregamos los géneros al nuevo Videogame creado
        
        if (genres.length) {
          genres.map(async (g) => {
            try {
              let genre = await Genres.findOrCreate({ where: { nombre: g } });
              gameCreate.addGenres(genre[0]);
            } catch (err) {
              console.log(err);
            }
          });
        }
      res.status(201).send(gameCreate);
    } catch (error) {
        res.status(500).send('Error interno en el servidor');
        console.error('Error en la consola de create: ', error.message);
    }
};
module.exports = {
    getAllVideogames,
    getVideogamesById,
    createVideogame

}