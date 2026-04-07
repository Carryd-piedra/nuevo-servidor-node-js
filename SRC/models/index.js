const Producto = require('./producto.model');
const Categoria = require('./categoria.model');

//exportamos los modelos para usarlos en otras partes de la aplicacion
//como en los controladores y rutas
module.exports = {
    Producto,
    Categoria
};

//relacion de 1 a N (una categoria tiene muchos productos)
Categoria.hasMany(Producto, {
    foreignKey: 'categoriaId',
    as: 'productos'
});

//relacion inversa: un producto pertenece a una categoria
Producto.belongsTo(Categoria, {
    foreignKey: 'categoriaId',
    as: 'categoria'
});