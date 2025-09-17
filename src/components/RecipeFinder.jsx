import React, { useState } from 'react';
import { searchRecipes } from '../services/recipeApi';
import RecipeCard from './RecipeCard';
import RecipeDetail from './RecipeDetail';

const RecipeFinder = () => {
  const [ingredients, setIngredients] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!ingredients.trim()) return;

    setLoading(true);
    setError('');
    setSelectedRecipe(null);

    try {
      const ingredientList = ingredients
        .split(',')
        .map(ingredient => ingredient.trim())
        .filter(ingredient => ingredient.length > 0);

      const results = await searchRecipes(ingredientList);
      setRecipes(results);
    } catch (err) {
      setError('Failed to fetch recipes. Please try again.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSearch(e);
    }
  };

  if (selectedRecipe) {
    return (
      <RecipeDetail 
        recipe={selectedRecipe} 
        onBack={() => setSelectedRecipe(null)} 
      />
    );
  }

  return (
    <div className="min-h-screen paper-texture" style={{
      background: 'linear-gradient(135deg, #f5f1e8 0%, #e8dcc0 50%, #d4c4a8 100%)',
      backgroundImage: `
        radial-gradient(circle at 1px 1px, rgba(139, 69, 19, 0.1) 1px, transparent 0),
        linear-gradient(135deg, #f5f1e8 0%, #e8dcc0 50%, #d4c4a8 100%)
      `,
      backgroundSize: '20px 20px, 100% 100%'
    }}>
      <div className="relative min-h-screen">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-4 border-8 rounded-lg shadow-2xl" style={{
            borderColor: '#7a5c3a',
            background: 'linear-gradient(145deg, #b08968, #a27a55)',
            boxShadow: 'inset 0 0 18px rgba(90,60,30,0.35), 0 0 26px rgba(90,60,30,0.35)'
          }}></div>
        </div>

        <div className="relative z-10 p-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="vintage-title text-6xl md:text-7xl mb-4" style={{
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                filter: 'drop-shadow(0 0 10px rgba(212, 175, 55, 0.3))'
              }}>
                Find Your Recipe
              </h1>
              <p className="vintage-subtitle text-xl md:text-2xl text-amber-800">
                Tell me what ingredients you have, and I shall find you the most delightful recipes.
              </p>
            </div>

            <div className="recipe-card p-8 mb-12" style={{
              background: 'linear-gradient(145deg, #fefefe, #f8f5f0)',
              border: '3px solid #d4af37',
              borderRadius: '20px',
              boxShadow: `
                0 8px 32px rgba(0, 0, 0, 0.15),
                inset 0 1px 0 rgba(255, 255, 255, 0.8),
                0 0 0 1px rgba(212, 175, 55, 0.2)
              `
            }}>
              <form onSubmit={handleSearch} className="space-y-8">
                <div>
                  <label className="block text-lg font-semibold text-amber-800 mb-4 vintage-subtitle">
                    What ingredients do you have in your pantry?
                  </label>
                  <input
                    type="text"
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter your ingredients separated by commas... (e.g., chicken, garlic, herbs, olive oil, tomatoes, pasta)"
                    className="vintage-input w-full px-6 py-4 text-lg"
                    disabled={loading}
                    style={{
                      fontSize: '1.1rem',
                      fontFamily: "'Crimson Text', serif"
                    }}
                  />
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    disabled={loading || !ingredients.trim()}
                    className="vintage-button px-12 py-4 text-xl font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      background: 'linear-gradient(145deg, #d4af37, #b8941f)',
                      border: '3px solid #8b4513',
                      textShadow: '2px 2px 4px rgba(0,0,0,0.4)',
                      boxShadow: `
                        0 6px 20px rgba(0, 0, 0, 0.3),
                        inset 0 2px 0 rgba(255, 255, 255, 0.3)
                      `
                    }}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <svg className="vintage-spinner -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Finding Recipes...
                      </span>
                    ) : (
                      '🔍 Find My Recipes'
                    )}
                  </button>
                </div>

                <p className="text-amber-700 text-center vintage-subtitle">
                  Press Ctrl + Enter or click the search button to find your recipes
                </p>
              </form>

              {error && (
                <div className="mt-6 p-4 bg-red-50 border-2 border-red-300 rounded-lg text-red-700 text-center vintage-subtitle">
                  {error}
                </div>
              )}
            </div>

            {recipes.length > 0 && (
              <div>
                <div className="text-center mb-8">
                  <h3 className="vintage-title text-3xl md:text-4xl text-amber-800 mb-4" style={{
                    textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
                  }}>
                    Found {recipes.length} delightful recipe{recipes.length !== 1 ? 's' : ''} for you
                  </h3>
                  <p className="vintage-subtitle text-lg text-amber-700">
                    Based on your ingredients: <span className="font-semibold text-amber-800">{ingredients}</span>
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {recipes.map((recipe) => (
                    <RecipeCard
                      key={recipe.id}
                      recipe={recipe}
                      onSelect={setSelectedRecipe}
                    />
                  ))}
                </div>
              </div>
            )}
            {recipes.length === 0 && !loading && (
              <div className="text-center py-16">
                <div className="text-8xl mb-6" style={{ filter: 'drop-shadow(0 0 10px rgba(212, 175, 55, 0.3))' }}>🍳</div>
                <h3 className="vintage-title text-3xl text-amber-800 mb-4">Ready to cook?</h3>
                <p className="vintage-subtitle text-xl text-amber-700">
                  Enter your ingredients above to discover amazing recipes!
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="text-center py-12 text-amber-700">
          <p className="vintage-subtitle text-2xl italic" style={{
            textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
          }}>
            - Let the kitchen magic begin -
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecipeFinder;
