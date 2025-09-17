import React from 'react';

const RecipeDetail = ({ recipe, onBack }) => {
  if (!recipe) return null;

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="relative">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-64 md:h-80 object-cover"
        />
        <button
          onClick={onBack}
          className="absolute top-4 left-4 bg-white bg-opacity-90 hover:bg-opacity-100 px-3 py-2 rounded-full text-gray-700 hover:text-gray-900 transition-colors"
        >
          ← Back to Recipes
        </button>
        <div className="absolute top-4 right-4 bg-white bg-opacity-90 px-3 py-1 rounded-full text-sm font-medium">
          {recipe.readyInMinutes} minutes
        </div>
      </div>

      <div className="p-6 md:p-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{recipe.title}</h1>
        
        {recipe.summary && (
          <div className="mb-6 p-4 bg-amber-50 rounded-lg">
            <p className="text-gray-700 italic">{recipe.summary}</p>
          </div>
        )}
        
        <div className="flex items-center space-x-6 mb-6 text-gray-600">
          <div className="flex items-center">
            <span className="text-2xl mr-2">⏱️</span>
            <span>{recipe.readyInMinutes} minutes</span>
          </div>
          <div className="flex items-center">
            <span className="text-2xl mr-2">👥</span>
            <span>Serves {recipe.servings}</span>
          </div>
        </div>

        {(recipe.missedIngredients?.length > 0 || recipe.usedIngredients?.length > 0) && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Ingredient Match</h3>
            {recipe.usedIngredients?.length > 0 && (
              <div className="mb-3">
                <p className="text-sm text-green-600 font-medium mb-2">✅ You have these ingredients:</p>
                <div className="flex flex-wrap gap-2">
                  {recipe.usedIngredients.map((ingredient, index) => (
                    <span key={index} className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full">
                      {ingredient.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {recipe.missedIngredients?.length > 0 && (
              <div>
                <p className="text-sm text-orange-600 font-medium mb-2">⚠️ You need these ingredients:</p>
                <div className="flex flex-wrap gap-2">
                  {recipe.missedIngredients.map((ingredient, index) => (
                    <span key={index} className="text-sm bg-orange-100 text-orange-800 px-3 py-1 rounded-full">
                      {ingredient.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Ingredients</h2>
            <ul className="space-y-2">
              {recipe.ingredients?.length > 0 ? (
                recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-amber-600 mr-2">•</span>
                    <span className="text-gray-700">{ingredient}</span>
                  </li>
                ))
              ) : (
                <li className="text-gray-500 italic">No ingredients available</li>
              )}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Instructions</h2>
            <ol className="space-y-3">
              {recipe.instructions?.length > 0 ? (
                recipe.instructions.map((instruction, index) => (
                  <li key={index} className="flex items-start">
                    <span className="bg-amber-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">
                      {index + 1}
                    </span>
                    <span className="text-gray-700">{instruction}</span>
                  </li>
                ))
              ) : (
                <li className="text-gray-500 italic">No instructions available</li>
              )}
            </ol>
          </div>
        </div>

        {(recipe.sourceUrl || recipe.spoonacularSourceUrl) && (
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Source</h3>
            <div className="space-y-2">
              {recipe.sourceUrl && (
                <a
                  href={recipe.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-600 hover:text-amber-700 underline block"
                >
                  View Original Recipe
                </a>
              )}
              {recipe.spoonacularSourceUrl && (
                <a
                  href={recipe.spoonacularSourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-600 hover:text-amber-700 underline block"
                >
                  View on Spoonacular
                </a>
              )}
            </div>
          </div>
        )}

        {recipe.isError && (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">😔</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Oops!</h3>
            <p className="text-gray-600">{recipe.summary}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeDetail;
