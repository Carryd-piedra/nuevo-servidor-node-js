const axios = require('axios');
const fs = require('fs');
const path = require('path');

const API_URL = 'http://localhost:3000/api/facturacion/ver-pdf';

const payload = {
    "datosFactura": {
        "serial": "001-001-123456",
        "details": {
            "nombreComercial": "Mi Empresa S.A.",
            "ruc": "0102030405001",
            "direccion": "Av. Siempre Viva 123",
            "phone1": "0991234567",
            "email": "empresa@example.com",
            "razonSocial": "Mi Empresa S.A."
        },
        "customer": {
            "email": "cliente@ejemplo.com"
        },
        "products": [
            {
                "code": "1",
                "quantity": 2,
                "description": "Zapatos Deportivos",
                "unit_Price": "50.00",
                "total": "100.00"
            }
        ],
        "subtotal": "100.00",
        "tax": "12.00",
        "totalTax": "112.00",
        "key": "1234567890",
        "dateAut": "2023-10-27",
        "ambiente": "PRUEBAS",
        "date": "2023-10-27"
    }
};

async function testPDF() {
    try {
        console.log('Requesting PDF...');
        const response = await axios.post(API_URL, payload, {
            responseType: 'arraybuffer' // Important for binary data
        });

        const outputPath = path.join(__dirname, 'test_invoice.pdf');
        fs.writeFileSync(outputPath, response.data);
        console.log(`PDF saved successfully to: ${outputPath}`);
        console.log(`Size: ${response.data.length} bytes`);

    } catch (error) {
        console.error('Error:', error.response ? error.response.data.toString() : error.message);
    }
}

testPDF();
