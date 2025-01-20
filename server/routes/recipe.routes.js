import express from 'express';
import { getRecipes, createRecipe,getRecipeById } from '../controllers/recipe.controller.js';

const router = express.Router();

router.post('/getRecipe', getRecipes);
router.post('/createRecipe', createRecipe);
router.post('/getRecipeById', getRecipeById);

export default router;
