import express from 'express';
import Pokemon from '../models/Pokemon.js';
import { autenticarJWT, autorizarRol } from '../middlewares/auth.js';

const router = express.Router();


router.get('/', async (req, res) => {

  try {
    const pokemones = await Pokemon.find({ isDeleted: false });
    res.json(pokemones);
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al obtener los pokemones', error: error.message
    });
  }

});

router.get('/:id', async (req, res) => {
  const { id } = req.params; // const id = req.params.id
  try {
    const pokemon = await Pokemon.find({ _id: id, isDeleted: false });
    if (pokemon) {
      res.json(pokemon)
    } else {
      res.status(404).json({ mensaje: 'Pokemon no encontrado' });
    }
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al obtener el Pokemon', error: error.message
    });
  }
});

router.post('/', autenticarJWT, autorizarRol('admin'), async (req, res) => {
  const nuevoPokemonData = req.body;
  try {
    const nuevoPokemon = new Pokemon(nuevoPokemonData);
    const pokemonGuardado = await nuevoPokemon.save();
    res.status(201).json(pokemonGuardado);
  } catch (error) {
    res.status(400).json({
      mensaje: 'Error al crear al Pokemon', error: error.message
    });
  }
});


router.put('/:id', autenticarJWT, autorizarRol('admin'), async (req, res) => {
  const { id } = req.params;
  const datosActualizados = req.body;
  try {
    const pokemonActualizado = await Pokemon.findByIdAndUpdate(id, datosActualizados, { new: true });
    if (pokemonActualizado) {
      res.json(pokemonActualizado);
    } else {
      res.status(404).json({ mensaje: 'Pokemon no encontrado' });
    }
  } catch (error) {
    res.status(400).json({
      mensaje: 'Error al actualizar la consola', error: error.message
    });
  }
});

router.patch('/:id', autenticarJWT, autorizarRol('admin'), async (req, res) => {
  const { id } = req.params;
  const datosActualizados = req.body;
  try {
    const pokemonActualizado = await Pokemon.findByIdAndUpdate(id, datosActualizados, { new: true });
    if (pokemonActualizado) {
      res.json(pokemonActualizado);
    } else {
      res.status(404).json({ mensaje: 'Pokemon no encontrado' });
    }
  } catch (error) {
    res.status(400).json({
      mensaje: 'Error al actualizar la consola', error: error.message
    });
  }
});

router.delete('/:id', autenticarJWT, autorizarRol('admin'), async (req, res) => {
  const { id } = req.params;
  try {
    const pokemonEliminado = await Pokemon.findByIdAndUpdate(
      id,
      {
        isDeleted: true,
        deletedAt: new Date()
      },
      { new: true }
    );
    if (pokemonEliminado) {
      res.json({ mensaje: 'Pokemon eliminado correctamente' });
    } else {
      res.status(404).json({ mensaje: 'Pokemon no encontrado' });
    }
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al eliminar el pokemon', error: error.message
    });
  }
});

export default router;