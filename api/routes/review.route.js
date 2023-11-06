import express from 'express';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { create, destroy, show } from '../controllers/review.controller.js';

const router = express.Router();

router.get('/:id/gigs', isAuthenticated, show);
router.get('/:id', isAuthenticated, show);
router.post('/', isAuthenticated, create);
router.delete('/:id', isAuthenticated, destroy);

export default router;
