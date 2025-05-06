import express from 'express';
import { registerUser, loginUser, addFavorite,logoutUser, checkAuth } from '../controllers/user.controller.js';
import {authMiddleware} from '../middleware/authMiddleware.js';
import { removeFavorite } from '../controllers/user.controller.js';
import { getAllFavorites } from '../controllers/user.controller.js';
const router = express.Router();


router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/favorites', authMiddleware, addFavorite); // Protect this route
router.post('/logout', logoutUser);
router.post('/check-auth', authMiddleware, checkAuth);
router.post('/removeFavorite', authMiddleware, removeFavorite); // Protect this route
router.get('/favorites', authMiddleware, getAllFavorites); // Protect this route
export default router;
