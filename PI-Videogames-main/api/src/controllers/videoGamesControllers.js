//traemos el modulo de axios para buscar por nombre y por id
const axios = require('axios')
//variable de entorno
require('dotenv').config()
//traigo la info de la api
const utils = require('../utils/getDataApi')
//traigo la información de los models
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
  
      //variable vacia para trabajar con la info de la api
      let dataVideogamesApi;
  
      // Si no se proporciona un nombre, obtengo todos los videojuegos de la API
      if (!name) {
        dataVideogamesApi = await utils.getDataApi();
        //si se proporciona nombre se busca en la url 
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
  
      // Combina los datos de la base de datos y la API filtrados
      const allData = dataDb.concat(dataVideogamesApi);
  
       // Filtrar los resultados si se proporciona un nombre en la consulta.
       //INCLUDES: determina si un array incluye un determinado elemento, devolviendo true o false
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
      res.status(500).send('Error interno en el servidor: ', error.message);
    }
  };
  


const getVideogamesById = async (req, res) => {
//extraemos el id
    const { idVideogame } = req.params;

  //verificamos si el ID es identificador unico universal para la info de la bdd

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
//recibimos datos recibidos del cuerpo de la solicitud. 
const createVideogame = async (req, res) => {
    const {
        nombre,
        descripcion,
        fecha_de_lanzamiento,
        rating,
         } = req.body;
         //Nombre del archivo subido
        const imagenURL  = req.file.filename;
        //estos datos recibidos son convertidos de un cadena JSON a un objeto js
        const plataformas = JSON.parse(req.body.plataformas);
        const genres = JSON.parse(req.body.genres);
        console.log(imagenURL);
        console.log(req.body);

    try {
      /*Creación de un nuevo VIDEOGAME en la base de datos.
        - Utilizamos el model Videogame para crear un nuevo registro en la base de datos con los datos proporcionados
      */
        let gameCreate = await Videogame.create({
            nombre,
            imagen: imagenURL,
            descripcion,
            plataformas,
            fecha_de_lanzamiento,
            rating,
        });
        /* 
          asociación de generos al videogame: 
          busca o crea el genero  en la base de datos
          asocia el género al nuevo videogame creado
          1_ verificamos si hay generos proporcionados en la solicitud. Si genres.length es mayor que 0, significa que hay generos disponibles para asociar al videogame
          2_ mapeo con genres.map 
           - utilizo el método .map para iterar sobre cada elemento de genres
           - cada elemento g representa un genero del videogame
          3_ creación o busqueda del género
            - utiliza el método Genres para buscar o crear un nuevo genero en la base de datos.
            - findOrCreate: busca un género con el nombre  proporcionado en la base de datos. Si no lo encuentra lo crea automaticamente.
          4_ asociación del genero:
            - una vez encontrado o creado el genero se utiliza el método addGenres() para asociar el genero al videogame
            - genre[0] es  el primer elemento del array devuelto por findOrCreate que contiene el genero encontrado o creado
        */
        if (genres.length) {
          genres.map(async (g) => {
            try {
              let genre = await Genres.findOrCreate({ where: { nombre: g } });
              gameCreate.addGenres(genre[0]);
            } catch (err) {
              console.log('Error al asociar genero: ', err.message);
            }
          });
        }
        res.status(201).send(gameCreate);
        console.log(gameCreate);
    } catch (error) {
        res.status(500).send('Error interno en el servidor');
        console.error('Error en la consola de create: ', error.message);
    }
};

//controlador Node para la eliminación de videogames
/*
  extraemos el id por params. 
  buscamos la primera coincidencia
  si no se encuentra. devolvemos status 404
  eliminamos la asociación con el genero
  destruimos el videogame con where: id
*/
const deleteVideogame = async (req,res) => {
  const {id} = req.params

  try {
    const videogame = await Videogame.findByPk(id)
    if(!videogame) {
      res.status(404).send('No se pudo eliminar el videogame')
    }
    
    await videogame.removeGenres();
    
    await Videogame.destroy({where: {id} })
    res.status(200).send('El videogame ha sido eliminado exitosamente de la base de datos.')
  } catch (error) {
    console.error('Error interno al eliminar: ', error.message)
    res.status(500).send('Error al eliminar videogame: ', error.message)
  }
}


/* 
  Manejo de Errores y Respuesta:
  Si se crea exitosamente el nuevo videojuego, devuelve el objeto creado con el estado HTTP 201 (Created).

  Si ocurre algún error durante el proceso de creación, devuelve un mensaje de error con el estado HTTP 500 (Internal Server Error) y registra el error en la consola.
*/

module.exports = {
    getAllVideogames,
    getVideogamesById,
    createVideogame,
    deleteVideogame
    

}