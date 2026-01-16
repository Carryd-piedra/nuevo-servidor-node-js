const axios = require('axios');

const API_URL = 'http://localhost:3000/api/facturacion/enviar';

const payload = {
    "destinatario": "diego@example.com", // Changed to a dummy email for safety, or keep user's if safe
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

async function testEmail() {
    try {
        console.log('Sending invoice...');
        const response = await axios.post(API_URL, payload);
        console.log('Success:', response.data);
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
    }
}

testEmail();
