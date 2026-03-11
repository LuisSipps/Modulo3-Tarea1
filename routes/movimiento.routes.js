import express from 'express';
import Movimiento from '../models/Movimiento.js';
import AppError from '../utils/AppError.js';
import { autenticarJWT } from '../middlewares/auth.js';

const router = express.Router();

router.post('/', autenticarJWT, async (req, res, next) => {
  const nuevoMovimiento = req.body;
  console.log('Nuevo Ataque recibido', nuevoMovimiento);
  try {
    console.log('Usuario autenticado:', req.usuario);
    const creadorId = req.usuario.id;
    nuevoMovimiento.creadoPor = creadorId;
    const nuevoMovimientoData = new Movimiento(nuevoMovimiento);
    const movimientoGuardado = await nuevoMovimientoData.save();
    res.status(201).json(movimientoGuardado);
  } catch (error) {
    next(new AppError('Error al guardar el movimiento', 400));
  }
});

router.get('/', async (req, res, next) => {
  try {
    const movimientos = await Movimiento.find().populate('pokemon', 'name').populate('creadoPor', 'username');
    res.json(movimientos);
  } catch (error) {
    next(new AppError('Error al obtener los movimientos', 500));
  }

});

export default router;