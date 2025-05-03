
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

  const API_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "";

  const handleSearch = async () => {
    try {
      const response = await axios.post(`${API_URL}/api/recipes/getRecipe`, {
        ingredients: ingredients.split(",").map((item) => item.trim()),
        vegetarian: isVegetarian,
        glutenFree: isGlutenFree,
      });
      setRecipes(response.data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const handleAddToFavorites = async (recipeId) => {
    try {
      await axios.post(`${API_URL}/api/users/favorites`, { recipeId });
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
    <div className="relative w-screen h-screen overflow-auto">
      {/* Background video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        autoPlay
        loop
        muted
      >
        <source src="/videoplayback1.mp4" type="video/mp4" />
      </video>

      {/* Overlay for glass effect */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 backdrop-blur-sm z-0" />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center p-6">
        <header className="w-full max-w-5xl flex justify-between items-center bg-gradient-to-r from-orange-500 to-yellow-500 text-white p-4 rounded-xl shadow-xl animate-slideInDown">
          <h1 className="text-2xl font-extrabold tracking-wide">👨🏻‍🍳 InstaRecipes</h1>
          <div className="space-x-3">
            <button
              onClick={handleProfile}
              className="bg-white text-orange-600 px-4 py-2 rounded-lg font-medium hover:bg-orange-100 transition"
            >
              Profile
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Search Panel */}
        <main className="w-full max-w-4xl mt-8 bg-white bg-opacity-80 backdrop-blur-md rounded-2xl p-6 shadow-2xl animate-fadeInUp max-h-[75vh] overflow-hidden flex flex-col">
  {/* Sticky Search Section */}
  <div className="sticky top-0 bg-white bg-opacity-90 backdrop-blur-md z-10 p-4 rounded-2xl shadow-md">
    <h2 className="text-xl font-bold mb-2">Search Recipes</h2>
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
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-blue-700"
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

  {/* Scrollable Recipe List */}
  <div className="flex-1 overflow-y-auto mt-4">
    <h2 className="text-lg font-bold mb-2">Recipes</h2>
    {recipes.length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="border p-4 rounded-lg shadow hover:shadow-md transition bg-white bg-opacity-80"
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
              <span className="font-bold">Nutritional Info: </span>
              <>
                <li>Calories: {recipe.nutrition.calories}</li>
                <li>Protein: {recipe.nutrition.protein}</li>
                <li>Fat: {recipe.nutrition.fat}</li>
                <li>Carbs: {recipe.nutrition.carbs}</li>
              </>
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
      <p className="text-gray-600">No recipes found. Try different ingredients.</p>
    )}
  </div>
</main>
      </div>
    </div>
  );
};

export default HomePage;
