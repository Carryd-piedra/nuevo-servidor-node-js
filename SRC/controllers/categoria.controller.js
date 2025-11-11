
const Categoria = require('../models/categoria.model');

//metodo para crear una nueva categoria y guardarla en la base de datos
exports.crearCategoria = async (req, res) => {
    try {
        // aqui obtenemos los datos de la categoria desde el cuerpo de la solicitud
        const { nombre, descripcion } = req.body;

        const nuevaCategoria = await Categoria.create({
            nombre,
            descripcion
        });
        res.status(201).json(nuevaCategoria);

    } catch (error) {
        // Manejo de errores
        console.error('Error al crear la categoria:', error);
        res.status(500).json({
            mensaje: 'Error al crear la categoria'
        });
    }
}

exports.obtenerCategorias = async (req, res) => {
    try {
        ///usamos el metodo findAll de sequelize para obtener todas las categorias
        const categorias = await Categoria.findAll();
        res.status(200).json(categorias);
    } catch (error) {
        console.error('Error al obtener las categorias:', error);
        res.status(500).json({
            mensaje: 'Error al obtener las categorias' // Mensaje corregido
        });
    }
}

exports.actualizarCategoria = async (req, res) => {
    try {
        const { id } = req.params; // ID de la categoria a actualizar
        const { nombre, descripcion } = req.body; // Nuevos datos
        // 1. Buscamos la categoria
        const categoria = await Categoria.findByPk(id);
        if (!categoria) {
            return res.status(404).json({
                mensaje: 'Categoria no encontrada'
            });
        }
        // 2. Actualizamos los campos
        categoria.nombre = nombre || Categoria.nombre;
        categoria.descripcion = descripcion || Categoria.descripcion;
        // 3. Guardamos los cambios en la base de datos
        await categoria.save();
        res.status(200).json({
            mensaje: 'Categoria actualizada exitosamente',
            categoria: categoria
        });
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al actualizar la categoria'
        });
    }
}

//metodo para eliminar una categoria existente
exports.eliminarCategoria = async (req, res) => {
    try {
        const { id } = req.params; // ID de la categoria a eliminar
        // Usamos el método destroy de Sequelize
        const filasEliminadas = await Categoria.destroy({
            where: {
                id: id
            }
        });
        if (filasEliminadas === 0) {

            return res.status(404).json({
                mensaje: 'Categoria no encontrada'
            });
        }
        res.status(200).json({
            mensaje: 'Categoria eliminada exitosamente'
        });

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al eliminar la categoria'
        });
    }
}