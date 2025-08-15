import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import recipeData from "../data.json";

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const foundRecipe = recipeData.find((recipe) => recipe.id === parseInt(id));
    setRecipe(foundRecipe);
  }, [id]);

  if (!recipe) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Recipe Not Found
        </h1>
        <Link
          to="/"
          className="text-indigo-600 font-semibold hover:text-indigo-800"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        to="/"
        className="text-indigo-600 font-semibold hover:text-indigo-800 mb-6 inline-block"
      >
        &larr; Back to Home
      </Link>
      <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-4xl mx-auto">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-64 sm:h-96 object-cover"
        />
        <div className="p-6 sm:p-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-4">
            {recipe.title}
          </h1>
          <p className="text-gray-600 text-lg mb-6">{recipe.summary}</p>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              Ingredients
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              Instructions
            </h2>
            <ol className="list-decimal list-inside text-gray-700 space-y-2">
              {recipe.instructions.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
