import express from 'express';
import {
  getUsers,
  getUserById,
  createUser,
  deleteUser,
} from '../controllers/UsersController.js';
import { isLoggedIn, isAdmin } from '../middleware/AuthMiddleware.js';

const router = express.Router();

router.get('/api/users', getUsers);
router.post('/api/users', createUser);
router.get('/api/users/:id', getUserById);
router.delete('/api/users/:id', isLoggedIn, isAdmin, deleteUser);

export default router;
