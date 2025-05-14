import RecipeCard from '@/components/RecipeCard';
import { getRecipes } from '@/lib/actions/recipe';

const handleTitle = ({ category, ingredient, area }: RecipeSearchParams) => {
  if (category) return `Recipes in Category: ${category}`;
  if (ingredient) return `Recipes with Ingredient: ${ingredient}`;
  if (area) return `Recipes from: ${area}`;
  return 'All Recipes';
};

interface Props {
  searchParams: Promise<RecipeSearchParams>;
}

const Page = async ({ searchParams }: Props) => {
  const params = await searchParams;
  const recipes = await getRecipes(params);

  return (
    <main className="recipes">
      <h1>{handleTitle(params)}</h1>
      <section className="recipes-grid">
        {recipes.map((recipe) => <RecipeCard key={recipe.idMeal} recipe={recipe} />)}
      </section>
    </main>
  );
};

export default Page;