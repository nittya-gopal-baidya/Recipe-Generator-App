import { Recipe } from '../model/Recipe.js';

// Fetch recipes based on ingredients, vegetarian, and gluten-free
export const getRecipes = async (req, res) => {
  const { ingredients, vegetarian, glutenFree,difficulty,cookingTime } = req.body;

  if (!ingredients || ingredients.length === 0) {
    return res.status(400).json({ error: 'Ingredients are required' });
  }

  // Build query conditions based on the provided data
  const queryConditions = {
    ingredients: { $all: ingredients }, // Match all provided ingredients
  };

  if (vegetarian !== undefined) {
    queryConditions.vegetarian = vegetarian; // Filter by vegetarian flag (true/false)
  }


  if (glutenFree !== undefined) {
    queryConditions.glutenFree = glutenFree; // Filter by glutenFree flag (true/false)
  }
  if (difficulty !== undefined) {
    queryConditions.difficulty = difficulty; // Filter by dificulty to prepare
  }if (cookingTime !== undefined) {
    queryConditions.cookingTime = cookingTime; // Filter by cooking time 
  }

  try {
    const recipes = await Recipe.find(queryConditions);
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching recipes' });
  }
};

// Create a new recipe
export const createRecipe = async (req, res) => {
  const { name, description, ingredients, instructions, nutrition, difficulty, cookingTime, vegetarian, glutenFree } = req.body;

  if (!name || !description || !ingredients || !instructions || !nutrition || !difficulty || !cookingTime) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const recipe = new Recipe({ 
      name, 
      description, 
      ingredients, 
      instructions, 
      nutrition, 
      difficulty, 
      cookingTime,
      vegetarian,
      glutenFree
    });
    await recipe.save();
    res.status(201).json({
      success: true,
      message: "Recipe created successfully",
      user: {
        ...recipe._doc,
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Error creating recipe' });
  }
};
