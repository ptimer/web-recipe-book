import RecipeCard from '@/components/RecipeCard';
import { getRecipes } from '@/lib/actions/recipe';

const handleTitle = ({ category, ingredient, area }: RecipeSearchParams) => {
  if (category) return `Recipes in Category: ${category}`;
  if (ingredient) return `Recipes with Ingredient: ${ingredient}`;
  if (area) return `Recipes from: ${area}`;
  return 'All Recipes';
};

const Page = async ({ searchParams }: { searchParams: Promise<RecipeSearchParams> }) => {
  const params = await searchParams;
  const recipes = await getRecipes(params);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{handleTitle(params)}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {recipes.map((recipe) => <RecipeCard key={recipe.idMeal} recipe={recipe} />)}
      </div>
    </div>
  );
};

export default Page;