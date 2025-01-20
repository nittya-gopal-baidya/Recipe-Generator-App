
import mongoose from 'mongoose';

const RecipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  vegetarian:{type:Boolean,required:true},
  glutenFree:{type:Boolean,required:true},
  description: { type: String, required: true },
  ingredients: { type: [String], required: true },
  instructions: { type: [String], required: true },
  nutrition: {
    calories: { type: Number, required: true },
    protein: { type: Number, required: true },
    fat: { type: Number, required: true },
    carbs: { type: Number, required: true },
  },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], required: true },
  cookingTime: { type: Number, required: true },

});

export const Recipe = mongoose.model('Recipe', RecipeSchema);