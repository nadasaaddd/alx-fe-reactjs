import React, { useState } from "react";
import { Link } from "react-router-dom";

const AddRecipeForm = () => {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Recipe title is required";
    if (!ingredients.trim()) {
      newErrors.ingredients = "Ingredients are required";
    } else {
      const ingredientList = ingredients
        .split("\n")
        .filter((item) => item.trim());
      if (ingredientList.length < 2) {
        newErrors.ingredients = "At least two ingredients are required";
      }
    }
    if (!instructions.trim())
      newErrors.instructions = "Preparation steps are required";
    return newErrors;
  };

  const handleSubmit = () => {
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const newRecipe = {
        id: Date.now(), // Temporary ID for demo purposes
        title: title.trim(),
        ingredients: ingredients.split("\n").filter((item) => item.trim()),
        instructions: instructions.split("\n").filter((item) => item.trim()),
        summary: instructions.split("\n")[0]?.trim() || "A delicious recipe", // Generate summary from first step
        image: "https://via.placeholder.com/300", // Placeholder image
      };
      console.log("New Recipe Submitted:", newRecipe);
      // In a real app, send newRecipe to an API here
      setTitle("");
      setIngredients("");
      setInstructions("");
      preventDefault("");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        to="/"
        className="text-indigo-600 font-semibold hover:text-indigo-800 mb-6 inline-block"
      >
        &larr; Back to Home
      </Link>
      <div className="bg-white rounded-lg shadow-md p-6 sm:p-8 max-w-lg mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-6">
          Add New Recipe
        </h1>
        <div className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-gray-700 font-semibold mb-2"
            >
              Recipe Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter recipe title"
            />
            {errors.title && (
              <p className="text-red-600 text-sm mt-1">{errors.title}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="ingredients"
              className="block text-gray-700 font-semibold mb-2"
            >
              Ingredients (one per line)
            </label>
            <textarea
              id="ingredients"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              rows="5"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter ingredients, one per line"
            />
            {errors.ingredients && (
              <p className="text-red-600 text-sm mt-1">{errors.ingredients}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="instructions"
              className="block text-gray-700 font-semibold mb-2"
            >
              Preparation Steps (one per line)
            </label>
            <textarea
              id="instructions"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              rows="5"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter preparation steps, one per line"
            />
            {errors.instructions && (
              <p className="text-red-600 text-sm mt-1">{errors.instructions}</p>
            )}
          </div>
          <button
            ons
            onSubmit={handleSubmit}
            className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Submit Recipe
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddRecipeForm;
