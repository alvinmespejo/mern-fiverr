import express from 'express';

import isAuthenticated from '../middlewares/isAuthenticated.js';
import { create, show } from '../controllers/message.controller.js';

const router = express.Router();

router.get('/:id', isAuthenticated, show);
router.post('/', isAuthenticated, create);
export default router;
