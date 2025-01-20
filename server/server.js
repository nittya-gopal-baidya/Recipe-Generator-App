
import express  from'express';
import { connectDB } from "./db/connectDB.js";
import dotenv  from'dotenv';
import cors  from'cors';
import cookieParser from "cookie-parser";
import recipeRoutes  from'./routes/recipe.routes.js';
import userRoutes  from'./routes/user.routes.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());//Parse incoming request
app.use(cookieParser());//Parse incoming cookies
// Routes
app.use('/api/recipes', recipeRoutes);
app.use('/api/users', userRoutes);


// Start server
app.listen(PORT, () => {
    connectDB();
  console.log(`Server running on http://localhost:${PORT}`);
});
