const axios = require('axios');

const API_URL = 'http://localhost:3000/api/auth';

async function testLogin() {
    const testUser = {
        nombre: 'Test User',
        correo: 'testlogin@example.com',
        password: 'password123'
    };

    try {
        // 1. Register
        console.log('Registering user...');
        try {
            await axios.post(`${API_URL}/register`, testUser);
            console.log('Registration successful');
        } catch (error) {
            if (error.response && error.response.data.mensaje === 'El correo ya está registrado') {
                console.log('User already exists, proceeding to login');
            } else {
                console.error('Registration failed:', error.message);
                return;
            }
        }

        // 2. Login with exact email
        console.log('Logging in with exact email...');
        try {
            const loginResponse = await axios.post(`${API_URL}/login`, {
                correo: testUser.correo,
                password: testUser.password
            });
            console.log('Login exact match: SUCCESS', loginResponse.data.messaje);
        } catch (error) {
            console.error('Login exact match: FAILED', error.response ? error.response.data : error.message);
        }

        // 3. Login with uppercase email
        console.log('Logging in with uppercase email...');
        try {
            const loginResponseUpper = await axios.post(`${API_URL}/login`, {
                correo: testUser.correo.toUpperCase(),
                password: testUser.password
            });
            console.log('Login uppercase match: SUCCESS', loginResponseUpper.data.messaje);
        } catch (error) {
            console.error('Login uppercase match: FAILED', error.response ? error.response.data : error.message);
        }

        // 4. Login with whitespace
        console.log('Logging in with whitespace...');
        try {
            const loginResponseSpace = await axios.post(`${API_URL}/login`, {
                correo: ' ' + testUser.correo + ' ',
                password: testUser.password
            });
            console.log('Login whitespace match: SUCCESS', loginResponseSpace.data.messaje);
        } catch (error) {
            console.error('Login whitespace match: FAILED', error.response ? error.response.data : error.message);
        }

    } catch (error) {
        console.error('Unexpected error:', error);
    }
}

testLogin();
