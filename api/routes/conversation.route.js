import express from 'express';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import {
  show,
  index,
  update,
  create,
  messages,
} from '../controllers/conversation.controller.js';

const router = express.Router();

router.get('/', isAuthenticated, index);
router.get('/:id/messages', isAuthenticated, messages);
router.get('/:id', isAuthenticated, show);
router.post('/', isAuthenticated, create);
router.patch('/:id', isAuthenticated, update);

export default router;
