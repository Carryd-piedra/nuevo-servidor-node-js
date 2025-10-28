const express = require('express');
const app = express();
const sequelize = require('./config/database');
const productoRoutes = require('./routes/producto.route');
require('dotenv').config();
app.use = express.json();

app.use(productoRoutes);
{
    async () => {
        await sequelize.authenticate();
        console.log('Conexion establecida a la base de datos exitosa');
        await sequelize.sync({ alert: true });
        console.log('tablas sincronizadas');
        app.listen(process.env.PORT, () => {
            console.log(`Tu servidor esta corriendo en el puerto ${process.env.PORT}`);
        });
    }
}

//cambiar la rita de inicio en el main

