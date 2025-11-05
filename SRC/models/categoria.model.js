
const { DataTypes } = require('sequelize'); 
const sequelize = require('../config/database');
//definimos una constante Categoria que sera nuestro modelo de datos y la estructura de la tabla categorias

//definir el modelo de datos para categorias usando sequelize
const Categoria = sequelize.define('Categoria', {
    id: { //ingresamos el id de la categoria
    type: DataTypes.INTEGER, 
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: { //ingresamos el nombre de la categoria
    type: DataTypes.STRING, 
    allowNull: false,
  },
  descripcion: { //Ingresamos la descripcion de la categoria
    type: DataTypes.STRING, 
    allowNull: false,
  }
})

module.exports = Categoria;