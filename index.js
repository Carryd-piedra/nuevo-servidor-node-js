const express = require('express');
const app = express();
require('dotenv').config();

app.listen(process.env.PORT, () => {
    console.log('Tu servidor esta corriendo en el puerto', process.env.PORT);
});
function numerospares(array) {
    return array.filter(num => num % 2 === 0);
}

