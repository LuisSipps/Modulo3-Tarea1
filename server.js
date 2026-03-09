import express from 'express';
import pokemonesRouter from './routes/pokemones.routes.js';
import usuariosRouter from './routes/users.routes.js'
import movimientosRouter from './routes/movimiento.routes.js';
import authRouter from './routes/auth.routes.js';
import conectarDB from './config/database.js';

const app = express();
app.use(express.json());

await conectarDB();

app.use('/api/pokemones', pokemonesRouter);
app.use('/api/usuarios', usuariosRouter);
app.use('/api/movimientos', movimientosRouter);
app.use('/api/auth', authRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`);
});

