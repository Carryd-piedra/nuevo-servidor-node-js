const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario.model');
// Registro de usuario
const generarToken = (user) => {
    return jwt.sign({
        id: user.id,
        correo: user.correo,
        nombre: user.nombre
    },
        process.env.JWT_SECRET,
        { expiresIn: '1h' });

};

const generarRefreshToken = (user) => {
    return jwt.sign({
        id: user.id
    },
        process.env.JWT_SECRET,
        { expiresIn: '7d' });

};

exports.registrarUsuario = async (req, res) => {
    try {
        const { nombre, correo, password } = req.body;
        const existe = await Usuario.findOne({ where: { correo } });

        if (existe) {
            return res.status(400).json({ mensaje: 'El correo ya está registrado' });
        }
        const hash = await bcrypt.hash(password, 10);//encriptar la contraseña antes de guardarla en la base de datos

        const nuevoUsuario = await Usuario.create({
            nombre,
            correo,
            password: hash
        });
        res.status(201).json({

            mensaje: 'Usuario registrado exitosamente',
            usuario: nuevoUsuario
        });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
};

exports.login = async (req, res) => {
    try {
        const { correo, password } = req.body;
        const usuario = await Usuario.findOne({ where: { correo: correo } });
        if (!usuario) {
            return res.status(404).json({ mensaje: 'Credenciales invalidas' });
        }

        const valido = await bcrypt.compare(password, usuario.password);
        if (!valido) { ///no se usa la base de datos para comparar contraseñas
            return res.status(400).json({ mensaje: 'Credenciales invalidas' });
        }

        const token = generarToken(usuario);
        const refreshToken = generarRefreshToken(usuario);
        await Usuario.update({ refreshToken: refreshToken });

        res.cookie('refreshToken', refreshToken, {
            hhtpOnly: true,
            secure: false,
            sameSite: 'strict',// funcione de manera exclusiva en https
            maxAge: 7 * 24 * 60 * 60 * 1000 //perido de validez de 7 dias
        });

        res.status(200).json({ messaje: 'Login exitoso', token: token });
    }
    catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
};

exports.refreshToken = async (req, res) => {
    try {
        const token = req.cookies.refreshToken;
        if (!token) return res.status(401).json({ message: 'No autorizado' });
        const usuario = await Usuario.findOne({ where: { refreshToken: token } });
        if (!usuario) return res.status(401).json({ message: 'No autorizado' });
        jwt.verify(token, process.env.JWT_SECRET);
        if (error) return res.status(401).json({ message: 'No autorizado' });
        const nuevoToken = generarToken(usuario);
        res.status(200).json({ token: nuevoToken });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor' });
    }
}

exports.logout = async (req, res) => {
    try {
        const token = req.cookies.refreshToken;
        if (!token) return res.status(204).end();
        const usuario = await Usuario.findOne({ where: { refreshToken: token } });
        if (!usuario) {
            res.clearCookie('refreshToken', { httpOnly: true, secure: false, sameSite: 'strict' });
            return res.status(204).end();
        }

        await usuario.update({ refreshToken: null });
        res.clearCookie('refreshToken', { httpOnly: true, secure: false, sameSite: 'strict' });
        res.json({ message: 'Logout exitoso' });

    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor' });
    }
}


