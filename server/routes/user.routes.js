import express from 'express';
import { registerUser, loginUser, addFavorite,logoutUser, checkAuth } from '../controllers/user.controller.js';
import {authMiddleware} from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/favorites', authMiddleware, addFavorite);
router.post('/logout',logoutUser);
router.post('/check-auth',authMiddleware,checkAuth);
export default router;
