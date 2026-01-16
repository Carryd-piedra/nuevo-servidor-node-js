const { Sequelize } = require('sequelize');
const sequelize = require('./SRC/config/database');
const Producto = require('./SRC/models/producto.model');

async function checkSpecificProducts() {
    try {
        await sequelize.authenticate();
        const productos = await Producto.findAll({
            where: {
                id: [20, 21]
            }
        });

        console.log('--- Checking Specific Products ---');
        for (const p of productos) {
            console.log(`ID: ${p.id}, Nombre: ${p.nombre}, CategoriaID: ${p.categoriaId}`);
        }

    } catch (error) {
        console.error(error);
    } finally {
        await sequelize.close();
    }
}

checkSpecificProducts();
