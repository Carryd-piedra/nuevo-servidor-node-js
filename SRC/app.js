const express = require('express');
const app = express();
const sequelize = require('./config/database');
const productoRoutes = require('./routes/producto.route');
const categoriaRoutes = require('./routes/categoria.route');
const loginRoutes = require('./routes/login.route');
const verificarToken = require('./middlewares/auth.middleware');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
const cookieParser = require('cookie-parser');
require('dotenv').config();

require('./models/producto.model');
require('./models/categoria.model');
require('./models/usuario.model');

app.use(express.json());
app.use(cookieParser());

// Rutas públicas
app.use("/api/auth", loginRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rutas protegidas
app.use("/api/productos", verificarToken, productoRoutes);
app.use("/api/categorias", verificarToken, categoriaRoutes);

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

startServer();