
import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  useEffect(() => {
    const fetchFavoriteRecipes = async () => {
      try {
        const response = await axios.post(
          `${API_URL}/api/recipes/getRecipeById`,
          { recipeIds: user.favorites }
        );
        setFavoriteRecipes(response.data);
      } catch (error) {
        console.error("Error fetching favorite recipes:", error);
      }
    };

    if (user.favorites && user.favorites.length > 0) {
      fetchFavoriteRecipes();
    }
  }, [user.favorites]);

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-orange-100 to-yellow-100 flex items-center justify-center p-4">
      {/* Card: flex column, fixed height, no outer scroll */}
      <div className="flex flex-col h-[90vh] max-w-4xl w-full bg-white bg-opacity-80 backdrop-blur-lg rounded-3xl shadow-xl border border-yellow-200 overflow-hidden animate-fadeInUp">

        {/* Header (sticky at top by virtue of flex layout) */}
        <div className="p-6 bg-white bg-opacity-90 backdrop-blur-md">
          <h2 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-orange-500 to-yellow-500">
            🍽️ MY PROFILE
          </h2>
        </div>

        {/* Profile Info (fixed height) */}
        <div className="p-6 bg-white bg-opacity-70 backdrop-blur-md border-b border-yellow-300">
          <h3 className="text-2xl font-bold text-orange-600 mb-2">👤 Profile Information</h3>
          <p className="text-lg font-semibold text-gray-800">Name: {user.username}</p>
          <p className="text-md font-medium text-gray-700">Email: {user.email}</p>
        </div>

        {/* Recipes List (scrollable flex-1) */}
        <div className="flex-1 overflow-y-auto p-6">
          <h3 className="text-2xl font-bold text-orange-700 mb-4">❤️ Favorite Recipes</h3>
          {favoriteRecipes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {favoriteRecipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className="bg-white bg-opacity-90 border border-orange-200 p-4 rounded-2xl shadow-lg hover:shadow-xl transition transform hover:scale-[1.02]"
                >
                  <h4 className="text-lg font-bold text-pink-700 mb-2">{recipe.name}</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Ingredients:</strong> {recipe.ingredients.join(", ")}
                  </p>
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Instructions:</strong>
                    <ul className="list-disc pl-5">
                      {recipe.instructions.map((step, idx) => (
                        <li key={idx}>{step}</li>
                      ))}
                    </ul>
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Nutritional Info:</strong>
                    <ul className="list-disc pl-5">
                      <li>Calories: {recipe.nutrition.calories}</li>
                      <li>Protein: {recipe.nutrition.protein}</li>
                      <li>Fat: {recipe.nutrition.fat}</li>
                      <li>Carbs: {recipe.nutrition.carbs}</li>
                    </ul>
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-pink-600 text-center mt-4">
              You don't have any favorite recipes yet.
            </p>
          )}
        </div>

        {/* Back Button (fixed at bottom by flex layout) */}
        <div className="p-6 bg-white bg-opacity-90 backdrop-blur-md border-t border-yellow-300">
          <button
            onClick={handleBack}
            className="w-full py-3 px-4 bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 text-white font-bold rounded-xl shadow-lg hover:from-pink-600 hover:to-yellow-500 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2 focus:ring-offset-white transition duration-200 ease-in-out transform hover:scale-105 active:scale-95">
            ⬅ Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
