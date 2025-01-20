import express from 'express';
import { getRecipes, createRecipe } from '../controllers/recipe.controller.js';

const router = express.Router();

router.post('/getRecipe', getRecipes);
router.post('/createRecipe', createRecipe);

export default router;
