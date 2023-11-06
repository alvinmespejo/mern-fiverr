import express from 'express';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import {
  index,
  create,
  paymentIntent,
  confirmPayment,
} from '../controllers/order.controller.js';

const router = express.Router();

router.get('/', isAuthenticated, index);
router.patch('/', isAuthenticated, confirmPayment);
router.post('/:id', isAuthenticated, create);
router.post('/create-intent/:id', isAuthenticated, paymentIntent);

export default router;
