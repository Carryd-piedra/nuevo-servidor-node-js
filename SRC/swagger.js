const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'API REST Node.js',
        description: 'Documentación generada automáticamente',
    },
    host: 'localhost:3000',
    basePath: '/',
    schemes: ['http'],
    securityDefinitions: {
        Bearer: {
            type: "apiKey",
            name: "Authorization",
            in: "header",
            description: "Enter your bearer token in the format **Bearer &lt;token&gt;**"
        }
    },
    security: [
        {
            Bearer: []
        }
    ]
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./src/app.js']; // El punto de entrada donde se usan las rutas

/* NOTE: If you are using the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);
