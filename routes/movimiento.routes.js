import express from 'express';
import Movimiento from '../models/Movimiento.js';
import { autenticarJWT, autorizarRol } from '../middlewares/auth.js';

const router = express.Router();

router.post('/', autenticarJWT, async (req, res) => {
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
    res.status(400).json({
      mensaje: 'Error al crear al Error al guardar movimiento', error: error.message
    });
  }
});

router.get('/', autenticarJWT, async (req, res) => {
  try {
    const movimientos = await Movimiento.find().populate('pokemon', 'name').populate('creadoPor', 'username');
    res.json(movimientos);
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al obtener los movimientos', error: error.message
    });
  }

});

export default router;