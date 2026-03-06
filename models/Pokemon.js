import mongoose from "mongoose";

const statsSchema = new mongoose.Schema({
    hp: { type: Number, required: true },
    attack: { type: Number, required: true },
    defense: { type: Number, required: true },
    speed: { type: Number, required: true }
}, { _id: false });

const pokemonSchema = new mongoose.Schema({
    pokemon_number: {
        type: Number,
        required: true,
        unique: true
    },

    name: {
        type: String,
        required: true,
        trim: true
    },

    type: {
        type: [String],
        required: true,
        lowercase: true
    },

    abilities: {
        type: [String],
        default: []
    },

    stats: {
        type: statsSchema,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true, // Crea automaticamente createdAT y updateAt
    versionKey: false, // Elimina el campo __v de versionado
});

const Pokemon = mongoose.model('Pokemon', pokemonSchema);

export default Pokemon;