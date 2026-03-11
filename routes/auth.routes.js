import express from "express";
import Usuario from "../models/Usuario.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import AppError from '../utils/AppError.js';

const router = express.Router();

router.post("/register", async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return next(new AppError("El usuario ya existe", 400));
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const nuevoUsuario = new Usuario({ username, email, password: hashedPassword });
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
    next(new AppError('Error al registrar el usuario', 500));
  }
});


router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  console.log("SECRET:", process.env.JWT_SECRET);//
  try {

    if (!email || !password) {
      return next(new AppError("Email y contraseña son obligatorios", 400));
    }

    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return next(new AppError('Usuario no encontrado', 404));
    }

    const esValido = await bcrypt.compare(password, usuario.password);

    if (!esValido) {
      return next(new AppError('Credenciales invalidas', 401));
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
    next(new AppError('Error al iniciar sesión', 500));
  }

});

export default router;