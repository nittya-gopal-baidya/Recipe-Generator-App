
import express  from 'express';
import dotenv  from 'dotenv';
import cors  from 'cors';
import cookieParser from "cookie-parser";
import recipeRoutes  from './routes/recipe.routes.js';
import userRoutes  from './routes/user.routes.js';
import path from 'path'
// Load environment variables
// dotenv.config();
dotenv.config({ path: '../.env' });
import { connectDB } from "./db/connectDB.js";


const app = express();
const PORT = process.env.PORT ;
const __dirname=path.resolve();
// Middleware
// app.use(cors());
app.use(
  cors({
    origin: 'http://localhost:5173', // Allow this origin
    credentials: true, // Allow cookies and other credentials
  })
);
app.use(express.json());//Parse incoming request
app.use(cookieParser());//Parse incoming cookies
// Routes
app.use('/api/recipes', recipeRoutes);
app.use('/api/users', userRoutes);

if(process.env.NODE_ENV==="production"){
  app.use(express.static(path.join(__dirname, 'client', 'dist')));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
});
}
// Start server
app.listen(PORT, () => {
    connectDB();
  console.log(`Server running on http://localhost:${PORT}`);
});

// Only For We Are Going To Deploy Our Project
// import express from 'express';
// import dotenv from 'dotenv';
// import cors from 'cors';
// import cookieParser from 'cookie-parser';
// import recipeRoutes from './routes/recipe.routes.js';
// import userRoutes from './routes/user.routes.js';
// import path from 'path';
// import { connectDB } from './db/connectDB.js';

// dotenv.config({ path: '../.env' });

// const app = express();
// const __dirname = path.resolve();

// // app.use(
// //   cors({
// //     origin: process.env.NODE_ENV === 'production' ? 'https://recipes-generator-frontend.vercel.app/' : 'http://localhost:5173',
// //     credentials: true,
// //   })
// // );
// app.use(
//   cors({
//     origin: process.env.NODE_ENV === 'production' ? 'https://recipes-generator-frontend.vercel.app' : 'http://localhost:5173',
//     credentials: true,
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization', 'x-csrf-token'],
//   })
// );
// app.use(express.json());
// app.use(cookieParser());

// app.use('/api/recipes', recipeRoutes);
// app.use('/api/users', userRoutes);

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../client/dist')));
//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'));
//   });
// }

// connectDB();

// export default app;