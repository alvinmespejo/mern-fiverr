import express from 'express';
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import userRoutes from './routes/user.route.js';
import orderRoutes from './routes/order.route.js';
import reviewRoutes from './routes/review.route.js';
import authRoutes from './routes/auth.route.js';
import registrationRoutes from './routes/registration.route.js';
import gigRoutes from './routes/gig.route.js';
import messageRoutes from './routes/message.route.js';
import conversationRoutes from './routes/conversation.route.js';

const app = express();
const config = dotenv.config();
const env = dotenvExpand.expand(config).parsed;

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
    // optionsSuccessStatus: 200,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/registration', registrationRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/gigs', gigRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/conversations', conversationRoutes);

app.use((error, req, res, next) => {
  const errorStatus = error.statusCode || 500;
  const errorMessage =
    error.message || 'An error occured while processing request.';
  console.log(error);
  return res.status(errorStatus).json(errorMessage);
});

mongoose
  .set('strictQuery', true)
  .connect(env.MONGO_DB_URI)
  .then(() => {
    app.listen(env.PORT, () => {
      console.log(`API server running on port ${env.PORT}`);
    });
  })
  .catch((err) => console.log(`Error connecting to mongo DB server`, err));
// Log mongo DB queries
// mongoose.set('debug', (collectionName, method, query, doc) => {
//   console.log(`${collectionName}.${method}`, JSON.stringify(query), doc);
// });
