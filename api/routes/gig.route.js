import express from 'express';
import {
  destroy,
  index,
  show,
  update,
  create,
} from '../controllers/gig.controller.js';

import isAuthenticated from '../middlewares/isAuthenticated.js';

const router = express.Router();

router.get('/', index);
router.get('/:id', show);
router.post('/', isAuthenticated, create);
router.patch('/:id', isAuthenticated, update);
router.delete('/:id', isAuthenticated, destroy);

export default router;
