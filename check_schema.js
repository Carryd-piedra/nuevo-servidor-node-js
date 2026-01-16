const sequelize = require('./SRC/config/database');

async function checkColumns() {
    try {
        await sequelize.authenticate();
        console.log('Conectado.');

        // Consultar estructura de la tabla
        const [results] = await sequelize.query("DESCRIBE Productos");
        console.log('---- Columnas en Tabla Productos ----');
        results.forEach(col => {
            console.log(`- ${col.Field} (${col.Type})`);
        });

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await sequelize.close();
    }
}

checkColumns();
