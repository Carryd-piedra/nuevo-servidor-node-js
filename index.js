const express = require('express');
const app = express();
require('dotenv').config();
app.use(express.json());

// request, response son parámetros que funcionan de la mano con HTTP
app.get('/api/hello', (req, res) => {
    const nombre = 'Diego';
    res.status(200).json(`Hola Mundo, mi nombre es ${nombre}`);
});

// POST a la misma ruta para recibir datos en el body
app.post('/api/hello', (req, res) => {
    const {name, apellido} = req.body;
    console.log(name, apellido);
    res.status(200).json({ mensaje: 'mensaje recibido' });
});


//crear un end point de tipo post que recibe un body datos de un producto
//y devolver por consola el endpoint /api/producto

app.post('/api/producto', (req, res) => {
    const { nombre, precio, stock } = req.body;
    console.log('Producto recibido:', { nombre, precio, stock });
    res.status(200).json({ mensaje: 'Producto enviado correctamente' });
}); 

app.listen(process.env.PORT, () => {
    console.log(`Tu servidor esta corriendo en el puerto ${process.env.PORT}`);
});



