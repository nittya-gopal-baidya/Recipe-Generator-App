import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

// const API_URL =import.meta.env.MODE === "development" ? "http://localhost:3000" : "https://insta-recipe-2o65vxvwe-nittyas-projects.vercel.app";
const API_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "https://recipes-generator-m4cwa1epp-nittyas-projects.vercel.app";
const ProfilePage = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);


  // useEffect(() => {
  //   const fetchAllFavorites = async () => {
  //     try {
  //       const response = await axios.get(`${API_URL}/api/users/favorites`);
  //       setFavoriteRecipes(response.data); // Update state with fetched favorites
  //     } catch (error) {
  //       console.error("Error fetching all favorites:", error);
  //     }
  //   };

  //   fetchAllFavorites(); // Fetch all favorites on component mount
  // }, []);
  useEffect(() => {
    const fetchAllFavorites = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/users/favorites`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setFavoriteRecipes(response.data);
      } catch (error) {
        console.error("Error fetching all favorites:", error);
        toast.error("Failed to fetch favorite recipes.");
      }
    };
  
    fetchAllFavorites();
  }, []);
  const handleBack = () => {
    navigate("/");
  };

  
  const handleRemove = async (favoriteId) => {
    try {
      await axios.post(`${API_URL}/api/users/removeFavorite`, {
        favoriteId, // Pass the favorite ID to the backend
      });
  
      // Update local state
      setFavoriteRecipes((prev) => prev.filter((fav) => fav._id !== favoriteId));
      toast.success("Removed from favorites");
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove item");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-orange-100 to-yellow-100 flex items-center justify-center p-4">
      <div className="flex h-[90vh] max-w-6xl w-full bg-white bg-opacity-80 backdrop-blur-lg rounded-3xl shadow-xl border border-yellow-200 overflow-hidden animate-fadeInUp">
        {/* Profile Column (Left) */}
        <div className="w-1/3 flex flex-col items-center justify-center p-6 bg-white bg-opacity-90 backdrop-blur-md border-r border-yellow-300">
          <div>
            <h2 className="text-3xl font-extrabold text-orange-600 text-center mb-6">
              👤 Profile Information
            </h2>
            <div className="ml-8">
              <p className="text-lg font-semibold text-gray-800">
                Name: {user.username}
              </p>
              <p className="text-md font-medium text-gray-700">
                Email: {user.email}
              </p>
            </div>
          </div>

          <button
            onClick={handleBack}
            className="mt-10 w-full py-3 px-4 bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 text-white font-bold rounded-xl shadow-lg hover:from-pink-600 hover:to-yellow-500 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2 transition duration-200 ease-in-out transform hover:scale-105 active:scale-95"
          >
            ⬅ Back to Home
          </button>
        </div>


        <div className="w-2/3 h-full overflow-y-auto p-6 sticky top-0">
          <h3 className="text-2xl font-bold text-orange-700 mb-4 text-center">
            ❤️ Favorite Recipes
          </h3>
          {favoriteRecipes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {favoriteRecipes.map((favorite) => (
                <div
                  key={favorite._id}
                  className="bg-white bg-opacity-90 border border-orange-200 p-4 rounded-2xl shadow-lg hover:shadow-xl transition transform hover:scale-[1.02]"
                >
                  <h4 className="text-lg font-bold text-pink-700 mb-2">
                    {favorite.recipe.name}
                  </h4>
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Ingredients:</strong>{" "}
                    {favorite.recipe.ingredients.join(", ")}
                  </p>
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Instructions:</strong>
                    <ul className="list-disc pl-5">
                      {favorite.recipe.instructions.map((step, idx) => (
                        <li key={idx}>{step}</li>
                      ))}
                    </ul>
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Nutritional Info:</strong>
                    <ul className="list-disc pl-5">
                      <li>Calories: {favorite.recipe.nutrition.calories}</li>
                      <li>Protein: {favorite.recipe.nutrition.protein}</li>
                      <li>Fat: {favorite.recipe.nutrition.fat}</li>
                      <li>Carbs: {favorite.recipe.nutrition.carbs}</li>
                    </ul>
                  </p>
                  <button
                    onClick={() => handleRemove(favorite._id)}
                    className="mt-2 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-pink-600 text-center mt-4">
              You don't have any favorite recipes yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
