const { DataTypes } = require('sequelize')
const {v4: uuid} = require('uuid')
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('genres', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUID,
        primaryKey: true,  // Marcar como clave primaria
        allowNull: false,
        unique: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
 
})
}