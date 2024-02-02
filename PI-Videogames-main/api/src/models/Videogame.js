const { DataTypes } = require('sequelize')
const {v4: uuid} = require('uuid')
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  //defino el modelo
  sequelize.define('videogame', {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuid(),
      primaryKey: true,  
      allowNull: false,
      unique: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    plataformas: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    imagen: {
      type: DataTypes.STRING
    },
    fecha_de_lanzamiento: {
      type: DataTypes.STRING
    },
    rating: {
      type: DataTypes.INTEGER
    }
  });
};
