import express from 'express';
import { NotFound } from '../controllers/PagesController.js';

const router = express.Router();

// Handle page not dound
router.use('/', NotFound);

export default router;
