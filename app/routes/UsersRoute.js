import express from 'express';
import {
  getUsers,
  getUserById,
  createUser,
  deleteUser,
} from '../controllers/UsersController.js';
import { isLoggedIn, isAdmin } from '../middleware/AuthMiddleware.js';

const router = express.Router();

router.get('/api/users', isLoggedIn, getUsers);
router.post('/api/users', isLoggedIn, createUser);
router.get('/api/users/:id', isLoggedIn, getUserById);
router.delete('/api/users/:id', isLoggedIn, isAdmin, deleteUser);

export default router;
