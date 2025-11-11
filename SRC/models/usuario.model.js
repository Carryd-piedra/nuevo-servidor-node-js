const { DataTypes } = require('sequelize'); 
const sequelize = require('../config/database');

const Usuario = sequelize.define('Usuario', {
    id: { 
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: { 
    type: DataTypes.STRING, 
    allowNull: false,
    unique: true,
  },
  correo: { 
    type: DataTypes.STRING, 
    allowNull: false,
    unique: true,
  },
  password: { 
    type: DataTypes.STRING, 
    allowNull: false,
  },
  refreshToken: { 
    type: DataTypes.STRING, 
    allowNull: false,
  }
});

module.exports = Usuario;