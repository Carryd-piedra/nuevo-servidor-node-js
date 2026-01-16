const { Sequelize } = require('sequelize');
const sequelize = require('./SRC/config/database');

async function inspectData() {
    try {
        await sequelize.authenticate();
        console.log('Database connected.');

        // Raw query to see exactly what columns and data are in the table
        const [results, metadata] = await sequelize.query("SELECT * FROM Productos");
        console.log('Raw SQL Results:', JSON.stringify(results, null, 2));

        if (results.length > 0) {
            console.log('Column names:', Object.keys(results[0]));
        } else {
            console.log('No products found in the table.');
        }

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await sequelize.close();
    }
}

inspectData();
