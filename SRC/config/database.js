const Sequelize = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,      // nombre de la base de datos
  process.env.DB_USER,      // usuario
  process.env.DB_PASSWORD,  // contraseña
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false,
    deffine: {
      timestamps: false, //borrar campos createdAt y updatedAt
      freetableName: true, //no pluralizar nombres de tablas
    },
  }
);

module.exports = sequelize;



