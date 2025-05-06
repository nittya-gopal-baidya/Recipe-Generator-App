import User from '../model/User.js';
import bcrypt from 'bcrypt';
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js';
import Favorite from '../model/Favorite.js';

// Register a new user
export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    return res
      .status(400)
      .json({ success: false, message: "User already exists" });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error registering user' });
  }
};

// User login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    generateTokenAndSetCookie(res,user._id);
    // res.json({ token });
    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: {
        ...user._doc,
        password: undefined,
      },

    });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in user' });
  }
};


// export const addFavorite = async (req, res) => {
//   const  recipe  = req.body; // Expecting the full recipe object in the request body

//   if (!recipe || !recipe.name || !recipe.ingredients || !recipe.instructions) {
//     // console.log("Invalid recipe object:", recipe);
//     return res.status(400).json({ error: 'Invalid recipe object. Ensure all required fields are provided.' });
//   }

//   try {
//     const user = await User.findById(req.userId);
//     if (!user) return res.status(404).json({ error: 'User not found' });

//     // Create a new favorite entry
//     const favorite = new Favorite({
//       userId: req.userId,
//       recipe,
//     });

//     await favorite.save();
//     res.json({ message: 'Recipe added to favorites', favorite });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Error adding favorite recipe' });
//   }
// };

export const addFavorite = async (req, res) => {
  const recipe = req.body; // Expecting the full recipe object in the request body

  if (!recipe || !recipe.name || !recipe.ingredients || !recipe.instructions) {
    return res.status(400).json({ error: 'Invalid recipe object. Ensure all required fields are provided.' });
  }

  try {
    const user = await User.findById(req.userId); // Get the logged-in user
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Create a new favorite entry
    const favorite = new Favorite({
      userId: req.userId, // Associate the favorite with the logged-in user
      recipe,
    });

    await favorite.save();
    res.json({ message: 'Recipe added to favorites', favorite });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error adding favorite recipe' });
  }
};

export const logoutUser = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logged out successfully" });
  // res.send("logout route");
};

export const checkAuth=async(req,res)=>{
  try {
    const user=await User.findById(req.userId)
    if(!user){
     return res.status(400).json({success:false,message:"User not found"})

    }
    res.status(200).json({success:true,user:{
      ...user._doc,
      password:undefined,
    }})
  } catch (error) {
    console.log("Error in checkAuth");
    res.status(400).json({ success: false, message: error.message });
  
  }
}

export const removeFavorite = async (req, res) => {
  const { favoriteId } = req.body;
  if (!favoriteId) {
    return res.status(400).json({ message: 'Missing favoriteId' });
  }

  try {
    await Favorite.findByIdAndDelete(favoriteId); // Remove the favorite by ID
    res.json({ message: 'Removed from favorites' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
// export const getAllFavorites = async (req, res) => {
//   try {
//     // Fetch all favorite recipes from the "Favorite" collection
//     const favorites = await Favorite.find().populate('userId', 'username email'); // Populate user details if needed
//     res.status(200).json(favorites);
//   } catch (error) {
//     console.error("Error fetching favorites:", error);
//     res.status(500).json({ error: "Failed to fetch favorites" });
//   }
// };
export const getAllFavorites = async (req, res) => {
  try {
    // Fetch favorite recipes for the logged-in user
    const favorites = await Favorite.find({ userId: req.userId }); // Filter by userId
    res.status(200).json(favorites);
  } catch (error) {
    console.error("Error fetching favorites:", error);
    res.status(500).json({ error: "Failed to fetch favorites" });
  }
};