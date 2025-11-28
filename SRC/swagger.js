const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'API REST Node.js',
        description: 'Documentación generada automáticamente',
    },
    host: 'localhost:3000',
    schemes: ['http'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./src/app.js']; // El punto de entrada donde se usan las rutas

/* NOTE: If you are using the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);
