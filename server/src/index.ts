import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// import routes
import authRouter from './modules/auth/auth.routes';
import usersRouter from './modules/users/users.routes'

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// register routes
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);

// Routes
app.all('*', (req, res) => {
  res.send('Hello, TypeScript Express Server!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});