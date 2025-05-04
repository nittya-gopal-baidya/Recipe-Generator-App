import { Recipe } from '../model/Recipe.js';
import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config({ path: '../.env' });
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
    res.status(500).json({ error: 'Error fetching recipes'});
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

  export const getRecipeById =async (req, res) => {
  try {
    const { recipeIds } = req.body;

    // Fetch recipes with IDs in the provided array
    const recipes = await Recipe.find({ _id: { $in: recipeIds } });

    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch recipes" });
  }
};

export const askGemini = async (req, res) => {
  const { ingredients, vegetarian, glutenFree, difficulty, cookingTime } = req.body;

  if (!ingredients || ingredients.length === 0) {
    return res.status(400).json({ error: 'Ingredients are required' });
  }

  const prompt = `
You are a recipe generator AI. Based on the following filters, return up to 10 recipes as a JSON array. Each recipe should have the following structure:

{
  "_id": "string (unique ID)",
  "name": "string",
  "vegetarian": true/false,
  "glutenFree": true/false,
  "description": "string",
  "ingredients": [array of strings],
  "instructions": [array of strings],
  "nutrition": {
    "calories": number,
    "protein": number,
    "fat": number,
    "carbs": number
  },
  "difficulty": "easy" | "medium" | "hard",
  "cookingTime": number (in minutes),
  "__v": 0
}

Use these input filters:
Ingredients: ${ingredients.join(', ')}
Vegetarian: ${vegetarian}
Gluten-Free: ${glutenFree}
Difficulty: ${difficulty || "any"}
Cooking Time: ${cookingTime || "any"}

Ensure the response is **valid JSON only**, no explanation or text before or after.
`;

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-001:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }] 
      }
    );

    let rawText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || '';

    // Attempt to extract valid JSON
    const jsonStart = rawText.indexOf('[');
    const jsonEnd = rawText.lastIndexOf(']');
    if (jsonStart === -1 || jsonEnd === -1) {
      return res.status(500).json({ error: 'Gemini returned invalid JSON.' });
    }

    const jsonString = rawText.substring(jsonStart, jsonEnd + 1);
    let parsedRecipes = JSON.parse(jsonString);

    // Ensure _id and __v are present
    parsedRecipes = parsedRecipes.map((recipe) => ({
      _id: recipe._id || uuidv4(),
      __v: 0,
      ...recipe
    }));

    return res.json(parsedRecipes);

  } catch (error) {
    console.error("Gemini API Error:", error?.response?.data || error.message);
    return res.status(500).json({ error: 'Failed to fetch recipes from Gemini' });
  }
};