import React from 'react';

const RecipeCard = ({ recipe, onSelect }) => {
  const hasMissingIngredients = recipe.missedIngredients && recipe.missedIngredients.length > 0;
  const hasUsedIngredients = recipe.usedIngredients && recipe.usedIngredients.length > 0;

  return (
    <div 
      className="recipe-card overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300"
      onClick={() => onSelect(recipe)}
      style={{
        background: 'linear-gradient(145deg, #fefefe, #f8f5f0)',
        border: '3px solid #d4af37',
        borderRadius: '16px',
        boxShadow: `
          0 8px 25px rgba(0, 0, 0, 0.15),
          inset 0 1px 0 rgba(255, 255, 255, 0.8),
          0 0 0 1px rgba(212, 175, 55, 0.2)
        `
      }}
    >
      <div className="relative">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-48 object-cover"
          style={{
            borderTopLeftRadius: '12px',
            borderTopRightRadius: '12px'
          }}
        />
        <div className="absolute top-4 right-4 badge-brown px-3 py-1 rounded-full text-sm font-bold vintage-subtitle" style={{
          textShadow: '1px 1px 2px rgba(255,245,230,0.6)',
          boxShadow: '0 2px 8px rgba(90,60,30,0.25)'
        }}>
          {recipe.readyInMinutes} min
        </div>
        {hasMissingIngredients && (
          <div className="absolute top-4 left-4 bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-xs font-bold" style={{
            background: 'linear-gradient(145deg, #fed7aa, #fdba74)',
            border: '2px solid #ea580c',
            textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
          }}>
            Missing {recipe.missedIngredients.length} ingredients
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="vintage-title text-xl font-bold text-amber-800 mb-3 line-clamp-2" style={{
          textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
        }}>{recipe.title}</h3>
        <p className="vintage-subtitle text-amber-700 text-sm mb-4 line-clamp-3">{recipe.summary}</p>
        
        <div className="flex items-center justify-between text-sm text-amber-600 mb-4 vintage-subtitle">
          <span className="flex items-center">
            <span className="text-lg mr-1">👥</span>
            Serves {recipe.servings}
          </span>
          <span className="flex items-center">
            <span className="text-lg mr-1">⏱️</span>
            {recipe.readyInMinutes} minutes
          </span>
        </div>

        {hasUsedIngredients && (
          <div className="mb-3">
            <p className="text-xs text-green-700 font-bold mb-2 vintage-subtitle">✅ You have:</p>
            <div className="flex flex-wrap gap-1">
              {recipe.usedIngredients.slice(0, 3).map((ingredient, index) => (
                <span key={index} className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium" style={{
                  background: 'linear-gradient(145deg, #dcfce7, #bbf7d0)',
                  border: '1px solid #16a34a',
                  textShadow: '1px 1px 1px rgba(0,0,0,0.1)'
                }}>
                  {ingredient.name}
                </span>
              ))}
              {recipe.usedIngredients.length > 3 && (
                <span className="text-xs text-green-700 font-medium">+{recipe.usedIngredients.length - 3} more</span>
              )}
            </div>
          </div>
        )}

        {hasMissingIngredients && (
          <div className="mb-3">
            <p className="text-xs text-orange-700 font-bold mb-2 vintage-subtitle">⚠️ You need:</p>
            <div className="flex flex-wrap gap-1">
              {recipe.missedIngredients.slice(0, 2).map((ingredient, index) => (
                <span key={index} className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full font-medium" style={{
                  background: 'linear-gradient(145deg, #fed7aa, #fdba74)',
                  border: '1px solid #ea580c',
                  textShadow: '1px 1px 1px rgba(0,0,0,0.1)'
                }}>
                  {ingredient.name}
                </span>
              ))}
              {recipe.missedIngredients.length > 2 && (
                <span className="text-xs text-orange-700 font-medium">+{recipe.missedIngredients.length - 2} more</span>
              )}
            </div>
          </div>
        )}

        {recipe.isError && (
          <div className="text-center py-4">
            <p className="text-red-600 text-sm vintage-subtitle">{recipe.summary}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeCard;
