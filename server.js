import express from 'express';
import pokemonesRouter from './routes/pokemones.routes.js';
import usuariosRouter from './routes/users.routes.js'
import conectarDB from './config/database.js';

const app = express();
app.use(express.json());

await conectarDB();

app.use('/api/pokemones', pokemonesRouter);
app.use('/api/usuarios', usuariosRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`);
});

