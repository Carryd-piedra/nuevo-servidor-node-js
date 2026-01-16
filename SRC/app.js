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

const Producto = require('./models/producto.model');
const Categoria = require('./models/categoria.model');
require('./models/usuario.model');

// Definir relaciones
Producto.belongsTo(Categoria, { foreignKey: 'categoriaId', as: 'categoria' });
Categoria.hasMany(Producto, { foreignKey: 'categoriaId', as: 'productos' });

app.use(express.json());
app.use(cookieParser());

// Rutas públicas
app.use("/api/auth", loginRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// Ruta publica para reportes (usando productoRoutes pero sin auth)
app.use("/api/reportes", productoRoutes);


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