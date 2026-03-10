import express from 'express';
import pokemonesRouter from './routes/pokemones.routes.js';
import usuariosRouter from './routes/users.routes.js'
import movimientosRouter from './routes/movimiento.routes.js';
import authRouter from './routes/auth.routes.js';
import conectarDB from './config/database.js';
import errorHandler from './middlewares/errorHandler.js';


const app = express();
app.use(express.json());
app.use(errorHandler);

await conectarDB();

app.use('/api/pokemones', pokemonesRouter);
app.use('/api/usuarios', usuariosRouter);
app.use('/api/movimientos', movimientosRouter);
app.use('/api/auth', authRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`);
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    status: "error",
    message: err.message
  });
});
