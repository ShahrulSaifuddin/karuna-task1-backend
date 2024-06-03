// #region Import
import 'express-async-errors';
import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { createServer } from 'http';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
const app = express();
const server = createServer(app);
import morgan from 'morgan';
import mongoose from 'mongoose';
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import { authenticateUser } from './middleware/authMiddleware.js';
import cookieParser from 'cookie-parser';
import todoRouter from './routers/todoRouter.js';
import userRouter from './routers/userRouter.js';
import authRouter from './routers/authRouter.js';
import path from 'path';
import compression from 'compression';
// #endregion

// #region Configuration
const __dirname = dirname(fileURLToPath(import.meta.url));
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.static(path.resolve(__dirname, './client/dist')));
app.use(cookieParser());
app.use(express.json());
// #endregion

// #region API
app.use('/api/v1/todos', authenticateUser, todoRouter);
app.use('/api/v1/users', authenticateUser, userRouter);
app.use('/api/v1/auth', authRouter);
app.use(compression());
// #endregion

// #region middleware
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/dist', 'index.html'));
});

app.use('*', (req, res) => {
  res.status(404).json({ msg: 'not found' });
});

app.use(errorHandlerMiddleware);
// #endregion

// #region Running up the server
const port = process.env.PORT || 5100;
console.log(`PORT: ${port}`);
console.log(`MONGO_URL: ${process.env.MONGO_URL}`);
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);

const startServer = async () => {
  try {
    if (!process.env.MONGO_URL) {
      throw new Error('MONGO_URL environment variable is not defined');
    }
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
    server.listen(port, () => {
      console.log(`Server running on PORT ${port}...`);
    });
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

startServer();
// #endregion
