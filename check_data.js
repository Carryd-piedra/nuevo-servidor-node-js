const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./SRC/config/database');
const Producto = require('./SRC/models/producto.model');
const Categoria = require('./SRC/models/categoria.model');

// Definir relaciones manualmente como en app.js
Producto.belongsTo(Categoria, { foreignKey: 'categoriaId' });
Categoria.hasMany(Producto, { foreignKey: 'categoriaId' });

async function checkData() {
    try {
        await sequelize.authenticate();
        console.log('Conexión exitosa.');

        // Verificar tablas existentes
        const [results] = await sequelize.query("SHOW TABLES");
        console.log('Tablas en la BD:', results.map(r => Object.values(r)[0]));

        const productos = await Producto.findAll();

        console.log(`\nEncontrados ${productos.length} productos.`);

        for (const p of productos) {
            let catNombre = 'N/A';
            if (p.categoriaId) {
                const cat = await Categoria.findByPk(p.categoriaId);
                catNombre = cat ? cat.nombre : 'ID no encontrado en tabla Categoria';
            }
            console.log(`Producto: ${p.nombre} (ID: ${p.id}) -> CategoriaID: ${p.categoriaId} -> Nombre Categoria: ${catNombre}`);
        }

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await sequelize.close();
    }
}

checkData();
