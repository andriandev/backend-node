import express from 'express';
import { authLogin, authMe } from '../controllers/AuthController.js';
import { isLoggedIn } from '../middleware/AuthMiddleware.js';

const router = express.Router();

router.post('/api/login', authLogin);
router.get('/api/me', isLoggedIn, authMe);

export default router;
