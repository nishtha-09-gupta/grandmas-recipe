
const RECIPE_API_BASE = 'https://api.spoonacular.com/recipes';
const API_KEY = 'b84be231270445a4aac62cd2310861b7';
const formatIngredients = (ingredients) => {
  return ingredients.join(',').replace(/\s+/g, '+');
};
const formatRecipe = (recipe) => {
  return {
    id: recipe.id,
    title: recipe.title,
    image: recipe.image || 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400',
    readyInMinutes: recipe.readyInMinutes || recipe.readyInMinutes || 30,
    servings: recipe.servings || 4,
    summary: recipe.summary ? recipe.summary.replace(/<[^>]*>/g, '') : 'Delicious recipe found for you!',
    missedIngredients: recipe.missedIngredients || [],
    usedIngredients: recipe.usedIngredients || [],
    unusedIngredients: recipe.unusedIngredients || []
  };
};
const formatDetailedRecipe = (recipe) => {
  return {
    id: recipe.id,
    title: recipe.title,
    image: recipe.image || 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400',
    readyInMinutes: recipe.readyInMinutes || 30,
    servings: recipe.servings || 4,
    summary: recipe.summary ? recipe.summary.replace(/<[^>]*>/g, '') : 'Delicious recipe found for you!',
    ingredients: recipe.extendedIngredients?.map(ing => ing.original) || [],
    instructions: recipe.analyzedInstructions?.[0]?.steps?.map(step => step.step) || [
      'Follow the recipe instructions carefully.',
      'Enjoy your delicious meal!'
    ],
    sourceUrl: recipe.sourceUrl,
    spoonacularSourceUrl: recipe.spoonacularSourceUrl
  };
};

export const searchRecipes = async (ingredients) => {
  try {
    if (!ingredients || ingredients.length === 0) {
      return [];
    }

    const ingredientsString = formatIngredients(ingredients);
    const response = await fetch(
      `${RECIPE_API_BASE}/findByIngredients?ingredients=${ingredientsString}&apiKey=${API_KEY}&number=12&ranking=2`
    );

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const formattedRecipes = data.map(formatRecipe);
    
    return formattedRecipes;
  } catch (error) {
    console.error('Error fetching recipes from Spoonacular:', error);
    return [{
      id: 'error',
      title: 'Unable to fetch recipes',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400',
      readyInMinutes: 0,
      servings: 0,
      summary: 'Sorry, we couldn\'t fetch recipes at the moment. Please check your internet connection and try again.',
      ingredients: [],
      instructions: ['Please try again later.'],
      isError: true
    }];
  }
};

export const getRecipeDetails = async (recipeId) => {
  try {
    const response = await fetch(
      `${RECIPE_API_BASE}/${recipeId}/information?apiKey=${API_KEY}&includeNutrition=false`
    );

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return formatDetailedRecipe(data);
  } catch (error) {
    console.error('Error fetching recipe details from Spoonacular:', error);
    return {
      id: recipeId,
      title: 'Recipe not found',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400',
      readyInMinutes: 0,
      servings: 0,
      summary: 'Sorry, we couldn\'t fetch the recipe details at the moment.',
      ingredients: ['Please try again later.'],
      instructions: ['Please try again later.'],
      isError: true
    };
  }
};
