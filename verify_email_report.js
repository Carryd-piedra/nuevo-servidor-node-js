const axios = require('axios');

const API_URL = 'http://localhost:3000/api/facturacion/enviar-reporte';

async function testEmailReport() {
    try {
        console.log('Sending Product Report Email...');
        const response = await axios.post(API_URL, {
            destinatario: 'delivered@resend.dev' // Correo de prueba de Resend
        });

        console.log('Response:', response.data);

    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
    }
}

testEmailReport();
