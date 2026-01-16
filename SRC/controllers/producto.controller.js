// controllers/producto.controller.js (actualizado COMPLETO)
const Producto = require('../models/producto.model');
const { sendEmailNotification } = require('../utils/emailSender');
const { crearPDF } = require('../utils/pdfGenerator');
const Categoria = require('../models/categoria.model');
const fs = require('fs');
const path = require('path');


// =============================
// Crear Producto
// =============================
exports.crearProducto = async (req, res) => {
    try {
        const { nombre, precio, descripcion, categoriaId } = req.body;


        const nuevoProducto = await Producto.create({
            nombre,
            precio,
            descripcion,
            categoriaId
        });


        res.status(201).json(nuevoProducto);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear el producto' });
    }
}


// =============================
// Obtener Productos con JOIN Categoría
// =============================
exports.obtenerProductos = async (req, res) => {
    try {
        const productos = await Producto.findAll({
            include: [{
                model: Categoria,
                as: 'categoria',
                attributes: ['id', 'nombre']
            }]
        });


        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener los productos' });
    }
}


// =============================
// Actualizar Producto
// =============================
exports.actualizarProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, precio, stock, categoriaId } = req.body;


        const producto = await Producto.findByPk(id);
        if (!producto) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }


        producto.nombre = nombre || producto.nombre;
        producto.precio = precio || producto.precio;
        producto.stock = stock || producto.stock;
        producto.categoriaId = categoriaId || producto.categoriaId;


        await producto.save();


        res.status(200).json({ mensaje: 'Producto actualizado exitosamente', producto });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar el producto' });
    }
}


// =============================
// Eliminar Producto
// =============================


exports.eliminarProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const eliminado = await Producto.destroy({ where: { id } });
        if (!eliminado) return res.status(404).json({ mensaje: 'No encontrado' });
        res.status(200).json({ mensaje: 'Eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// =============================
exports.generarReporteLocal = async (req, res) => {
    try {
        const productos = await Producto.findAll({
            include: [{ model: Categoria, as: 'categoria', attributes: ['id', 'nombre'] }],
            raw: true,
            nest: true
        });


        const productosData = productos.map(p => ({
            id: p.id,
            nombre: p.nombre,
            descripcion: p.descripcion,
            precio: p.precio,
            categoriaId: p.categoriaId,
            categoria: p.categoria?.nombre || 'Sin categoría'
        }));


        const dataReporte = {
            details: {
                nombreComercial: "Mi Empresa S.A.",
                ruc: "0102030405001",
                direccion: "Dirección de la Empresa",
                email: "contacto@miempresa.com"
            },
            date: new Date().toLocaleDateString(),
            totalItems: productosData.length,
            generatedBy: "Sistema de Reportes",
            products: productosData
        };


        const pdfBuffer = await crearPDF(dataReporte);


        const reportesDir = path.join(__dirname, '../../reportes');
        if (!fs.existsSync(reportesDir)) fs.mkdirSync(reportesDir);


        const fileName = `reporte_productos_${Date.now()}.pdf`;
        const filePath = path.join(reportesDir, fileName);


        fs.writeFileSync(filePath, pdfBuffer);


        res.json({
            message: 'Reporte generado y guardado exitosamente',
            path: filePath,
            fileName,
            count: productosData.length
        });


    } catch (error) {
        res.status(500).json({ message: 'Error al generar reporte local', error: error.message });
    }
};


exports.enviarReporteEmail = async (req, res) => {
    try {
        const { nombre, email, mensaje } = req.body;
        const productos = await Producto.findAll({
            include: [{ model: Categoria, as: 'categoria', attributes: ['id', 'nombre'] }],
            raw: true, nest: true
        });

        const dataReporte = prepararDatosReporte(productos, nombre);

        const pdfBuffer = await crearPDF(dataReporte);

        await sendEmailNotification(nombre, email, mensaje, pdfBuffer);

        res.status(200).json({
            success: true,
            message: 'Reporte generado y enviado a tu correo'
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error enviando el reporte', detalle: error.message });
    }
};

function prepararDatosReporte(productos, usuarioNombre = "Sistema") {
    return {
        details: {
            nombreComercial: "Mi Empresa S.A.",
            ruc: "0102030405001",
            direccion: "Calle Falsa 123",
            email: "admin@miempresa.com"
        },
        date: new Date().toLocaleDateString(),
        totalItems: productos.length,
        generatedBy: usuarioNombre,
        products: productos.map(p => ({
            id: p.id,
            nombre: p.nombre,
            descripcion: p.descripcion,
            precio: p.precio,
            categoriaId: p.categoriaId,
            categoria: p.categoria?.nombre || 'Sin categoría'
        }))
    };
}