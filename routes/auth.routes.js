import express from "express";
import Usuario from "../models/Usuario.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post("/register", async (req, res) => {

    const { username, email, password } = req.body;

    try {
        const usuarioExistente = await Usuario.findOne({ email });
        if (usuarioExistente) {
            return res.status(400).json({ mensaje: "El usuario ya existe" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const nuevoUsuario = new Usuario({
            username,
            email,
            password: hashedPassword
        });

        const usuarioGuardado = await nuevoUsuario.save();

        res.status(201).json({
            mensaje: "Usuario registrado correctamente",
            usuario: {
                id: usuarioGuardado._id,
                username: usuarioGuardado.username,
                email: usuarioGuardado.email
            }
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al registrar usuario",
            error: error.message
        });
    }
});


router.post("/login", async (req, res) => {

  const { email, password } = req.body;

  try {

    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(404).json({
        mensaje: "Usuario no encontrado"
      });
    }

    const esValido = await bcrypt.compare(password, usuario.password);

    if (!esValido) {
      return res.status(401).json({
        mensaje: "Contraseña incorrecta"
      });
    }

    const token = jwt.sign(
      {
        id: usuario._id,
        username: usuario.username,
        email: usuario.email,
        role: usuario.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      mensaje: "Login exitoso",
      token
    });

  } catch (error) {

    res.status(500).json({
      mensaje: "Error al iniciar sesión",
      error: error.message
    });

  }

});

export default router;