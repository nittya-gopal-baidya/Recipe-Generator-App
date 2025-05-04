import express from 'express';
import { getRecipes, createRecipe,getRecipeById,askGemini} from '../controllers/recipe.controller.js';

const router = express.Router();

router.post('/getRecipe', getRecipes);
router.post('/createRecipe', createRecipe);
router.post('/getRecipeById', getRecipeById);
router.post('/askGemini', askGemini); 
export default router;
