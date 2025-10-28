const { Database } = require('sequelize');
const sequelize = require('../config/database');
const Producto = sequelize.define('Producto', {
    id: {
        type: Database.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: Database.STRING,
        allowNull: false,
    },
    precio: {
        type: Database.FLOAT,
        allowNull: false,
    },
    stock: {
        type: Database.INTEGER,
        allowNull: false,
    }

})

module.exports = Producto;