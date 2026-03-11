import express from 'express';
import Pokemon from '../models/Pokemon.js';
import AppError from '../utils/AppError.js';
import { autenticarJWT, autorizarRol } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const pokemones = await Pokemon.find({ isDeleted: false });

    if (!pokemones) {
      return next(new AppError('No se pudieron obtener los pokemones', 404));
    }
    res.json(pokemones);
  } catch (error) {
    next(new AppError('Error al obtener los pokemones', 500));
  }
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const pokemon = await Pokemon.findOne({ _id: id, isDeleted: false });
    if (!pokemon) {
      return next(new AppError('Pokemon no encontrado', 404));
    }
    res.json(pokemon);
  } catch (error) {
    next(new AppError('Error al obtener el Pokemon', 500));
  }
});

router.post('/', autenticarJWT, autorizarRol('admin'), async (req, res, next) => {
  const nuevoPokemonData = req.body;
  try {
    const nuevoPokemon = new Pokemon(nuevoPokemonData);
    const pokemonGuardado = await nuevoPokemon.save();
    res.status(201).json(pokemonGuardado);
  } catch (error) {
    next(new AppError('Error al crear el Pokemon', 400));
  }
});


router.put('/:id', autenticarJWT, autorizarRol('admin'), async (req, res, next) => {
  const { id } = req.params;
  const datosActualizados = req.body;
  try {
    const pokemonActualizado = await Pokemon.findByIdAndUpdate(id, datosActualizados, { new: true });
    if (!pokemonActualizado) {
      return next(new AppError('Pokemon no encontrado', 404));
    }
    res.json(pokemonActualizado);
  } catch (error) {
    next(new AppError('Error al actualizar el Pokemon', 400));
  }
});

router.delete('/:id', autenticarJWT, autorizarRol('admin'), async (req, res, next) => {
  const { id } = req.params;
  try {
    const pokemonEliminado = await Pokemon.findByIdAndUpdate( id,{ isDeleted: true, deletedAt: new Date()},{ new: true });
    if (!pokemonEliminado) {
      return next(new AppError('Pokemon no encontrado', 404));
    }
    res.json({ mensaje: 'Pokemon eliminado correctamente' });

  } catch (error) {
    next(new AppError('Error al eliminar el Pokemon', 500));
  }
});

export default router;