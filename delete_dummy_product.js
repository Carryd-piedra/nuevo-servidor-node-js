const Producto = require('./SRC/models/producto.model');
const sequelize = require('./SRC/config/database');

async function deleteDummyProduct() {
    try {
        await sequelize.authenticate();
        console.log('Conectado a la base de datos.');

        const resultado = await Producto.destroy({
            where: {
                nombre: 'Producto de Prueba'
            }
        });

        if (resultado > 0) {
            console.log(`Se eliminaron ${resultado} productos de prueba.`);
        } else {
            console.log('No se encontraron productos de prueba para eliminar.');
        }

    } catch (error) {
        console.error('Error eliminando producto:', error);
    } finally {
        await sequelize.close();
    }
}

deleteDummyProduct();
