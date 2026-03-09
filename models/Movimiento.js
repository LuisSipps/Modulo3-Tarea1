import mongoose from "mongoose";

const movimientoSchema = new mongoose.Schema({

  nombre: {
    type: String,
    required: true,
    trim: true
  },

  tipo: {
    type: String,
    required: true,
    lowercase: true
  },

  clase:{
        type: String,
        enum: ['especial', 'físico']
    },

  poder: {
    type: Number
  },

  precision: {
    type: Number
  },

  pp: {
    type: Number,
    required: true
  },

  pokemon: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pokemon",
    required: [true, 'El pokemon es obligatorio']
  },

  creadoPor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: [true, 'El creador es obligatorio']
  }

}, {
  timestamps: true,
  versionKey: false
});

const Movimiento = mongoose.model("Movimiento", movimientoSchema);

export default Movimiento;