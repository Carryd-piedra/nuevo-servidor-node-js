const Producto = require('../models/producto.model');

//metodo para crear un producto y guardarlo en la base de datos
exports.crearProducto = async (req, res) => {
    try {
        const { nombre, precio, stock, categoriaId } = req.body; 

        const nuevoProducto = await Producto.create({ //definimos 
            nombre,
            precio,
            stock,
            categoriaId 
        });
        res.status(201).json(nuevoProducto);

    } catch (error) { //se contempla el error al crear el producto
        res.status(500).json({
            mensaje: 'Error al crear el producto'
        });
    }
}
//metodo para obtener todos los productos de la base de datos
exports.obtenerProductos = async (req, res) => {
    try {
        const productos = await Producto.findAll();
        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al obtener los productos'
        });
    }
}

//metodo para actualizar un producto existente
exports.actualizarProducto = async (req, res) => {
    try {
        const { id } = req.params; // ID del producto a actualizar
        const { nombre, precio, stock, categoriaId } = req.body; // Nuevos datos
        // 1. Buscamos el producto
        const producto = await Producto.findByPk(id);
        if (!producto) {
            return res.status(404).json({
                mensaje: 'Producto no encontrado'
            });
        }
        // 2. Actualizamos los campos
        producto.nombre = nombre || producto.nombre;
        producto.precio = precio || producto.precio;
        producto.stock = stock || producto.stock;
        producto.categoriaId = categoriaId || producto.categoriaId;
        // 3. Guardamos los cambios en la base de datos
        await producto.save(); 
        res.status(200).json({
            mensaje: 'Producto actualizado exitosamente',
            producto
        });
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al actualizar el producto'
        });
    }
}

//metodo para eliminar un producto
exports.eliminarProducto = async (req, res) => {
    try {
        const { id } = req.params; // ID del producto a eliminar
        // Usamos el método destroy de Sequelize
        const filasEliminadas = await Producto.destroy({
            where: {
                id: id
            }
        });
        if (filasEliminadas === 0) {
            // Si no se eliminó ninguna fila, el producto no existía
            return res.status(404).json({
                mensaje: 'Producto no encontrado'
            });
        }
        res.status(200).json({
            mensaje: 'Producto eliminado exitosamente'
        });

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al eliminar el producto'
        });
    }
}