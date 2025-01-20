import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";
const HomePage = () => {
  const [ingredients, setIngredients] = useState("");
  const [isVegetarian, setIsVegetarian] = useState(false);
  const [isGlutenFree, setIsGlutenFree] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const handleSearch = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/recipes/getRecipe",
        {
          ingredients: ingredients.split(",").map((item) => item.trim()),
          vegetarian: isVegetarian,
          glutenFree: isGlutenFree,
        } // Pass the data here
      );
      setRecipes(response.data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const handleAddToFavorites = async (recipeId) => {
    console.log(recipeId);
    try {
      await axios.post(
        `http://localhost:3000/api/users/favorites`,
        { recipeId }
      );
    //   alert("Recipe added to favorites!");
    toast.success("Recipe added to favorites!");

    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };
  const handleProfile = (e) => {
    e.preventDefault();

    navigate("/profile");
  };
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <header className="w-full flex justify-between items-center bg-blue-600 text-white p-4 rounded-lg shadow-md">
        <h1 className="text-xl font-bold">🧑🏻‍🍳</h1>
        <div>
          <button
            onClick={handleProfile}
            className="mr-4 bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-200"
          >
            Profile
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="w-full max-w-3xl mt-6">
        <div className="bg-white p-4 rounded shadow-lg mb-6">
          <h2 className="text-lg font-bold mb-2">Search Recipes</h2>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Enter ingredients (comma-separated)"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Search
            </button>
          </div>
          <div className="flex items-center mt-4 space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={isVegetarian}
                onChange={(e) => setIsVegetarian(e.target.checked)}
              />
              <span>Vegetarian</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={isGlutenFree}
                onChange={(e) => setIsGlutenFree(e.target.checked)}
              />
              <span>Gluten-Free</span>
            </label>
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow-lg">
          <h2 className="text-lg font-bold mb-2">Recipes</h2>
          {recipes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {recipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className="border p-4 rounded-lg shadow hover:shadow-md transition"
                >
                  <h3 className="text-md font-bold">{recipe.name}</h3>
                  <p className="text-sm text-gray-600">
                    <span className="font-bold">Ingredients: </span>
                    {recipe.ingredients.join(", ")}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-bold">Instructions: </span>
                    {recipe.instructions.map((instruction, index) => (
                      <li key={index}>{instruction}</li>
                    ))}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-bold">Nutritional Information: </span>
                    {<>
                      <li >Calories: {recipe.nutrition.calories}</li>
                      <li >Protein: {recipe.nutrition.protein}</li>
                      <li >Fat: {recipe.nutrition.fat}</li>
                      <li >Carbs: {recipe.nutrition.carbs}</li></>
                      
                    }
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-bold">Difficulty: </span>
                    {recipe.difficulty}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-bold">Cooking Time: </span>
                    {recipe.cookingTime} min
                  </p>

                  <button
                    onClick={() => handleAddToFavorites(recipe._id)}
                    className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Add to Favorite
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">
              No recipes found. Try searching with different ingredients.
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

export default HomePage;
