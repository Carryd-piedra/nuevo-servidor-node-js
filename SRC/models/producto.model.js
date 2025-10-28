// SRC/models/producto.model.js

// 💡 CORRECCIÓN 1: Importa DataTypes, no Database.
const { DataTypes } = require('sequelize'); 
const sequelize = require('../config/database');

const Producto = sequelize.define('Producto', {
    id: {
    type: DataTypes.INTEGER, // Esto ahora funcionará
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING, 
    allowNull: false,
  },
  precio: {
    type: DataTypes.FLOAT, 
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER, 
    allowNull: false,
  }
})

module.exports = Producto;