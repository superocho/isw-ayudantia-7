import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import tasksRoutes from './routes/tasks.routes.js';
import usersRoutes from './routes/users.routes.js';
import authRoutes from './routes/auth.routes.js';
import prisma from './config/prisma.js';
import { errorHandler, notFoundHandler } from './middlewares/error.middleware.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globales
app.use(cors());
app.use(express.json());

// Endpoint de salud
app.get('/', (req, res) => {
  res.json({ mensaje: 'API de tareas activa' });
});

// Rutas de la API
app.use('/api/auth', authRoutes);
app.use('/api/tasks', tasksRoutes);
app.use('/api/users', usersRoutes);

// Manejo de 404 (rutas inexistentes)
app.use(notFoundHandler);

// Manejo centralizado de errores (debe ir al final de todo)
app.use(errorHandler);

// Inicialización del servidor y base de datos
async function startServer() {
  try {
    await prisma.$connect();
    console.log('Conectado a PostgreSQL');

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error.message);
    process.exit(1);
  }
}

startServer();
