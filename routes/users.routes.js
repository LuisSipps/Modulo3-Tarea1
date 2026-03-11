import express from 'express';
import Usuario from '../models/Usuario.js';
import AppError from '../utils/AppError.js';
import { autenticarJWT, autorizarRol } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', autenticarJWT, async (req, res, next) => {
  try {
    const usuarios = await Usuario.find({ isDeleted: false });
    if (!usuarios) {
      return next(new AppError('No se pudieron obtener los usuarios', 404));
    }
    res.json(usuarios);
  } catch (error) {
    next(new AppError('Error al obtener los usuarios', 500));
  }
});

router.get('/:id', autenticarJWT, async (req, res, next) => {
  const { id } = req.params;
  try {
    const usuario = await Usuario.find({ _id: id, isDeleted: false });
    if (!usuario) {
      return next(new AppError('usuario no encontrado', 404));
    }
    res.json(usuario);
  } catch (error) {
    next(new AppError('Error al obtener el usuario', 500));
  }
});

router.delete('/:id', autenticarJWT, autorizarRol('admin'), async (req, res, next) => {
  const { id } = req.params;
  try {
    const usuarioEliminado = await Usuario.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    if (!usuarioEliminado) {
      return next(new AppError('Usuario no encontrado', 404));
    }
    res.json({ mensaje: 'Usuario eliminado correctamente' });

  } catch (error) {
    next(new AppError('Error al eliminar el usuario', 500));
  }
});

export default router;