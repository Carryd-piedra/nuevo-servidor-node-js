// SRC/app.js

const express = require('express');
const app = express();
const sequelize = require('./config/database');
const productoRoutes = require('./routes/producto.route');
require('dotenv').config();

// 💡 CORRECCIÓN 2: ¡Debes requerir el modelo para que Sequelize lo registre!
require('./models/producto.model'); 

app.use(express.json());
app.use(productoRoutes);

// 💡 CORRECCIÓN 3: Envolver el await en una función asíncrona.
async function startServer() {
    try {
        await sequelize.authenticate();
        console.log('Conexion establecida a la base de datos exitosa');
        
        // Ahora sequelize.sync() conoce el modelo Producto y creará la tabla.
        await sequelize.sync({ alter: true }); 
        console.log('tablas sincronizadas');
        
        app.listen(process.env.PORT, () => {
            console.log(`Tu servidor esta corriendo en el puerto ${process.env.PORT}`);
        });
    } catch (error) {
        console.error('No se pudo conectar a la base de datos:', error);
    }
}

startServer(); // Llamamos a la función para iniciar