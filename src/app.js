import express from 'express';
import morgan from 'morgan';
import { authenticateJWT } from './middlewares/authenticate.middleware.js'
//routes import
import usersRoutes from './routes/users.routes.js';
import authRoutes from './routes/auth.routes.js';
import tasksRoutes from './routes/tasks.routes.js';


const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(express.json()); //para el body del post

//routes

app.use('/api/login', authRoutes);
app.use('/api/tasks', authenticateJWT,tasksRoutes);
app.use('/api/users', usersRoutes);

export default app;