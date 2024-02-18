//Axios para hacer las solicitudes/promesas.
const axios = require('axios');
//variable de entorno
require('dotenv').config();
//traigo la info de la api
const utils = require('../utils/getDataApi')
//traigo la información de los models
const {Videogame, Genres} = require('../db');
const { Sequelize, Op, iLike } = require('sequelize');

const {API_KEY} = process.env;

// Un UUID es un identificador único para generar cadenas aleatorias y criptográficamente seguras.
//esta función valida si una cadena sigue el formato uuid
  const esUUID = (id) =>{
    const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    return uuidRegex.test(id);
  };

//Función Principal
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
          rating: vg.rating
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
          rating: vg.rating
        }));
      };
  
      //variable vacia para trabajar con la info de la api
      let dataVideogamesApi;
  
      //Si no se solicita videogame por nombre, se solicita toda la información disponible: 
      if (!name) {
        dataVideogamesApi = await utils.getDataApi();
        //si  se proporciona nombre se utiliza el endpoint proporcionado
      } else {
        const dataByName = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=15&search=${name}`);
        // Mapear los resultados para formatear la respuesta. 
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
  
      // concatenamos los datos de la base de datos y la API 
      const allData = dataDb.concat(dataVideogamesApi);
  
       // Filtrar los resultados si se proporciona un nombre en la consulta.
      
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
      res.status(500).send('Error interno en el servidor y la solicitud no pudo ser procesada: ');
      console.error('Error en getAllVideogame: ', error.message);
    }
  };
  


const getVideogamesById = async (req, res) => {

    const { idVideogame } = req.params;

    //Solicitar información sobre un id en especifico para mostrar los detalles del videogame en cuestión.

  //verificamos si el ID es identificador unico universal 

    try {
        if (esUUID(idVideogame)) {
          //Si es uuid busca en la bdd
            let dataDb = await Videogame.findByPk(idVideogame, {
                include: Genres
            });
              //formatea la informacion y la muestra
            if (dataDb) {
                return res.json({
                    id: dataDb.id,
                    nombre: dataDb.nombre,
                    descripcion: dataDb.descripcion,
                    plataformas: dataDb.plataformas,
                    imagen: dataDb.imagen,
                    fecha_de_lanzamiento: dataDb.fecha_de_lanzamiento,
                    rating: dataDb.rating,
                    genres: Array.isArray(dataDb.genres) ? dataDb.genres.map((i) => ({ name: i.nombre })) : []
                });
            } else {
                return res.status(404).send('No se encuentra videogames con ese id');
            }
        } else {
          //si no hay un id en la respuesta de la solicitud a de la base de datos entonces busco la info en la api
          //end point para buscar por id
            const URL = `https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`;
            
            //hago una peticion get a la url y extraigo la data
            const apiResponse = await axios.get(URL);
            const gameDetails = apiResponse.data;

            // Extraer la información de detalles necesaria de la API
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
//Retornamos el objeto con la información
            return res.status(200).send(response);
        };
    } catch (error) {
      console.error('Error en getById ', error.message);
      return res.status(500).send('Error interno en el servidor y la solicitud no pudo ser procesada: ');
    };
};
//Funcion para crear información: 
//recibimos datos  del cuerpo de la solicitud. 
const createVideogame = async (req, res) => {
    const {
        nombre,
        descripcion,
        fecha_de_lanzamiento,
        rating,
         } = req.body;
        const imagenURL  = req.file.filename; //extraer la url de la imagen 
        //estos datos recibidos son convertidos(parse) de un cadena JSON a un objeto js
        const plataformas = JSON.parse(req.body.plataformas);
        const genres = JSON.parse(req.body.genres);
        

    try {
      /*Creación de un nuevo VIDEOGAME, su relación y asociación de género en la base de datos.
      */
        let gameCreate = await Videogame.create({
            nombre,
            imagen: imagenURL,
            descripcion,
            plataformas,
            fecha_de_lanzamiento,
            rating,
        });
      //si género tiene disponible un elemento entonces: 
      
        if (genres.length) {
          //mapeo en una funcion async para extraer el género
          genres.map(async (g) => {
            try {
              //Lo buscamos, si no se encuentra lo creamos.
              let genre = await Genres.findOrCreate({ where: { nombre: g } });
              //Asociamos al juego creado el primer elemento(encontrado o asociado)
              gameCreate.addGenres(genre[0]);
            } catch (error) {
              console.log('Error al asociar genero: ', error.message);
            };
          });
        };
        res.status(201).send(gameCreate);
    } catch (error) {
        res.status(500).send('Error interno en el servidor y la solicitud no pudo ser procesada');
        console.error('Error en la funcion createVideogame: ', error.message);
    };
};

//Controlador de ruta para eliminar videogame y su relación.
const deleteVideogame = async (req,res) => {
  //Se extrae el id
  const {id} = req.params;

  try {
    //Buscamos la primera entrada que coincida con id
    const videogame = await Videogame.findByPk(id);
    if(!videogame) {
      res.status(404).send('No se pudo eliminar el videogame');
    };
    //eliminamos la relación
    await videogame.removeGenres();
    //Eliminamos el videogame
    await Videogame.destroy({where: {id} });
    res.status(200).send('El videogame ha sido eliminado exitosamente de la base de datos.');
  } catch (error) {
    console.error('Error interno al eliminar: ', error.message);
    res.status(500).send('Error al eliminar videogame: ', error.message);
  };
};

module.exports = {
    getAllVideogames,
    getVideogamesById,
    createVideogame,
    deleteVideogame
    

}