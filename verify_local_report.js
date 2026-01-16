const axios = require('axios');
const fs = require('fs');
const path = require('path');

const API_URL = 'http://localhost:3000/api/reportes/generar-reporte-local';

async function testLocalReport() {
    try {
        console.log('Requesting Local Report Generation...');
        const response = await axios.post(API_URL, {});

        console.log('Response Message:', response.data.message);

        if (response.data.path && fs.existsSync(response.data.path)) {
            console.log('SUCCESS: File exists at', response.data.path);
            const stats = fs.statSync(response.data.path);
            console.log('File size:', stats.size, 'bytes');
        } else {
            console.error('FAILURE: File not found at expected path');
        }

    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
    }
}

testLocalReport();
