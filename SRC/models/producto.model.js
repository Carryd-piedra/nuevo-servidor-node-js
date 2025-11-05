
//definir el modelo de datos para productos usando sequelize
const { DataTypes } = require('sequelize'); 
const sequelize = require('../config/database');

//definimos una constante Producto que sera nuestro modelo de datos y la estructura de la tabla productos
const Producto = sequelize.define('Producto', {
    id: { //ingresamos el id del producto
    type: DataTypes.INTEGER, // Esto ahora funcionará
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: { //ingresamos el nombre del producto
    type: DataTypes.STRING, 
    allowNull: false,
  },
  precio: { //ingresamos el precio del producto
    type: DataTypes.FLOAT, 
    allowNull: false,
  },
  descripcion: { //Ingresamos la descripcion del producto
    type: DataTypes.STRING, 
    allowNull: false,
  }
})

module.exports = Producto;

