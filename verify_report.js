const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Changed URL to the new public route
const API_URL = 'http://localhost:3000/api/reportes/reporte';

async function testReport() {
    try {
        console.log('Requesting Product Report...');
        const response = await axios.get(API_URL, {
            responseType: 'arraybuffer'
        });

        const outputPath = path.join(__dirname, 'reporte_productos.pdf');
        fs.writeFileSync(outputPath, response.data);
        console.log(`Report saved successfully to: ${outputPath}`);
        console.log(`Size: ${response.data.length} bytes`);

    } catch (error) {
        console.error('Error:', error.response ? error.response.data.toString() : error.message);
    }
}

testReport();
