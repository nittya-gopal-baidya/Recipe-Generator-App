
import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const API_URL = import.meta.env.MODE==="development"?"http://localhost:3000":"";
const ProfilePage = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  // Fetch favorite recipes when the component mounts
  useEffect(() => {
    const fetchFavoriteRecipes = async () => {
      try {
        const response = await axios.post(
          `${API_URL}/api/recipes/getRecipeById`,
          { recipeIds: user.favorites } // Send the array of recipe IDs
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
    <div className="max-w-md w-full mx-auto mt-10 p-8 bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl border border-blue-200">
      <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-500 to-blue-800 text-transparent bg-clip-text">
        MY PROFILE
      </h2>
      <div className="space-y-6">
        <div className="p-4 bg-blue-50 bg-opacity-50 rounded-lg border border-blue-300">
          <h3 className="text-xl font-serif font-bold text-blue-600  mb-3">
            Profile Information
          </h3>
          <p className="text-black font-bold">Name: {user.username}</p>
          <p className="text-black font-semibold">Email: {user.email}</p>
        </div>
        <h3 className="text-xl font-serif font-bold text-blue-600  mb-3">
            Favorite Recepies
          </h3>
        {/* Render Favorite Recipes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
          {favoriteRecipes.length > 0 ? (
            favoriteRecipes.map((recipe) => (
              <div
                key={recipe.id}
                className="border p-4 rounded-lg shadow hover:shadow-md transition bg-blue-100"
              >
                {/* Recipe Name */}
                <h3 className="text-md rounded-md  font-bold text-black">{recipe.name}</h3>

                {/* Ingredients */}
                <p className="text-sm text-pink-600">
                  <span className="font-bold">Ingredients: </span>
                  {recipe.ingredients.join(", ")}
                </p>

                {/* Instructions */}
                <p className="text-sm text-orange-500">
                  <span className="font-bold">Instructions: </span>
                  <ul className="list-disc pl-5">
                    {recipe.instructions.map((instruction, index) => (
                      <li key={index}>{instruction}</li>
                    ))}
                  </ul>
                </p>

                {/* Nutritional Information */}
                <p className="text-sm text-green-700">
                  <span className="font-bold">Nutritional Information: </span>
                  <ul className="list-disc pl-5">
                    <li>Calories: {recipe.nutrition.calories}</li>
                    <li>Protein: {recipe.nutrition.protein}</li>
                    <li>Fat: {recipe.nutrition.fat}</li>
                    <li>Carbs: {recipe.nutrition.carbs}</li>
                  </ul>
                </p>
              </div>
            ))
          ) : (
            <p className="text-blue-500 text-center">
              You don't have any favorite recipes yet.
            </p>
          )}
        </div>

        {/* Back Button */}
        <div className="mt-4">
          <button
            onClick={handleBack}
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white 
              font-bold rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-800
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
