import User from '../model/User.js';
import bcrypt from 'bcrypt';
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js';

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

// Add a recipe to favorites
export const addFavorite = async (req, res) => {
  //const { userId } = req.userId; // Assuming middleware extracts user from token
  const { recipeId } = req.body;
console.log("reciped id:",recipeId)
  try {
    const user = await User.findById(req.userId);
    console.log(user)
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.favorites.push(recipeId);
    await user.save();
    res.json({ message: 'Recipe added to favorites' });
  } catch (error) {
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