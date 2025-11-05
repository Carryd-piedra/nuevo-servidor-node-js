
const Categoria = require('../models/categoria.model');

//metodo para crear una nueva categoria y guardarla en la base de datos
exports.crearCategoria = async (req, res) => {
    try {
        // aqui obtenemos los datos de la categoria desde el cuerpo de la solicitud
        const { nombre, descripcion} = req.body;
        
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

exports.obtenerCategorias= async (req, res) => {
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