import express from 'express';
import { destroy, show } from '../controllers/user.controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';

const router = express.Router();

router.get('/:id', isAuthenticated, show);
router.delete('/:id', isAuthenticated, destroy);

export default router;
