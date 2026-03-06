import express from 'express';
import Pokemon from '../models/Pokemon.js';

const router = express.Router();

/* router.get('/', (req, res)=>{
    res.json(pokemonTest);
}); */

router.get('/', async (req, res) => {
  /* Pokemon.find()
  .then(pokemones => res.json(pokemones))
  .catch(err => res.status(500).json({ mensaje: 'Error al obtener los pokemones', error: err.message})); */

  try {
    const pokemones = await Pokemon.find({ isDeleted: false });
    res.json(pokemones);
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al obtener los pokemones', error: error.message
    });
  }

});

/* router.get('/:id', (req, res)=>{
    const {id} = req.params; // const id = req.params.id
    const pokemon = pokemonTest[id -1];
    if (pokemon){
        res.json(pokemon);
    }else {
        res.status(404).json({mensaje: 'Pokemon no encontrado'});
    }
    
}); */

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

/* router.post('/', (req, res)=>{
    const nuevoPokemon = req.body;
    console.log("Nuevo pokemon recibido:", nuevoPokemon);
    pokemonTest.push(nuevoPokemon);
    res.status(201).json(nuevoPokemon);
}); */

router.post('/', async (req, res) => {
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


router.put('/:id', async (req, res) => {
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

router.patch('/:id', async (req, res) => {
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

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const pokemonEliminado = await Pokemon.findById(id);
    if (pokemonEliminado) {
      pokemonEliminado.deletedAt = true;
      await pokemonEliminado.save();
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

/* const pokemonTest = [
  {
    "id": 1,
    "name": "Bulbasaur",
    "type": ["Grass", "Poison"],
    "abilities": ["Overgrow", "Chlorophyll"],
    "stats": { "hp": 45, "attack": 49, "defense": 49, "speed": 45 }
  },
  {
    "id": 4,
    "name": "Charmander",
    "type": ["Fire"],
    "abilities": ["Blaze", "Solar Power"],
    "stats": { "hp": 39, "attack": 52, "defense": 43, "speed": 65 }
  },
  {
    "id": 7,
    "name": "Squirtle",
    "type": ["Water"],
    "abilities": ["Torrent", "Rain Dish"],
    "stats": { "hp": 44, "attack": 48, "defense": 65, "speed": 43 }
  },
  {
    "id": 25,
    "name": "Pikachu",
    "type": ["Electric"],
    "abilities": ["Static", "Lightning Rod"],
    "stats": { "hp": 35, "attack": 55, "defense": 40, "speed": 90 }
  },
  {
    "id": 39,
    "name": "Jigglypuff",
    "type": ["Normal", "Fairy"],
    "abilities": ["Cute Charm", "Competitive"],
    "stats": { "hp": 115, "attack": 45, "defense": 20, "speed": 20 }
  },
  {
    "id": 52,
    "name": "Meowth",
    "type": ["Normal"],
    "abilities": ["Pickup", "Technician"],
    "stats": { "hp": 40, "attack": 45, "defense": 35, "speed": 90 }
  },
  {
    "id": 63,
    "name": "Abra",
    "type": ["Psychic"],
    "abilities": ["Synchronize", "Inner Focus"],
    "stats": { "hp": 25, "attack": 20, "defense": 15, "speed": 90 }
  },
  {
    "id": 66,
    "name": "Machop",
    "type": ["Fighting"],
    "abilities": ["Guts", "No Guard"],
    "stats": { "hp": 70, "attack": 80, "defense": 50, "speed": 35 }
  },
  {
    "id": 74,
    "name": "Geodude",
    "type": ["Rock", "Ground"],
    "abilities": ["Rock Head", "Sturdy"],
    "stats": { "hp": 40, "attack": 80, "defense": 100, "speed": 20 }
  },
  {
    "id": 92,
    "name": "Gastly",
    "type": ["Ghost", "Poison"],
    "abilities": ["Levitate"],
    "stats": { "hp": 30, "attack": 35, "defense": 30, "speed": 80 }
  },
  {
    "id": 95,
    "name": "Onix",
    "type": ["Rock", "Ground"],
    "abilities": ["Rock Head", "Sturdy"],
    "stats": { "hp": 35, "attack": 45, "defense": 160, "speed": 70 }
  },
  {
    "id": 104,
    "name": "Cubone",
    "type": ["Ground"],
    "abilities": ["Rock Head", "Lightning Rod"],
    "stats": { "hp": 50, "attack": 50, "defense": 95, "speed": 35 }
  },
  {
    "id": 113,
    "name": "Chansey",
    "type": ["Normal"],
    "abilities": ["Natural Cure", "Serene Grace"],
    "stats": { "hp": 250, "attack": 5, "defense": 5, "speed": 50 }
  },
  {
    "id": 131,
    "name": "Lapras",
    "type": ["Water", "Ice"],
    "abilities": ["Water Absorb", "Shell Armor"],
    "stats": { "hp": 130, "attack": 85, "defense": 80, "speed": 60 }
  },
  {
    "id": 133,
    "name": "Eevee",
    "type": ["Normal"],
    "abilities": ["Run Away", "Adaptability"],
    "stats": { "hp": 55, "attack": 55, "defense": 50, "speed": 55 }
  },
  {
    "id": 143,
    "name": "Snorlax",
    "type": ["Normal"],
    "abilities": ["Immunity", "Thick Fat"],
    "stats": { "hp": 160, "attack": 110, "defense": 65, "speed": 30 }
  },
  {
    "id": 147,
    "name": "Dratini",
    "type": ["Dragon"],
    "abilities": ["Shed Skin", "Marvel Scale"],
    "stats": { "hp": 41, "attack": 64, "defense": 45, "speed": 50 }
  },
  {
    "id": 149,
    "name": "Dragonite",
    "type": ["Dragon", "Flying"],
    "abilities": ["Inner Focus", "Multiscale"],
    "stats": { "hp": 91, "attack": 134, "defense": 95, "speed": 80 }
  },
  {
    "id": 150,
    "name": "Mewtwo",
    "type": ["Psychic"],
    "abilities": ["Pressure", "Unnerve"],
    "stats": { "hp": 106, "attack": 110, "defense": 90, "speed": 130 }
  },
  {
    "id": 151,
    "name": "Mew",
    "type": ["Psychic"],
    "abilities": ["Synchronize"],
    "stats": { "hp": 100, "attack": 100, "defense": 100, "speed": 100 }
  }
]; */

export default router;