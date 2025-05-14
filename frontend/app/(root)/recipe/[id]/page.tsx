import { getRecipe, getRecipes } from '@/lib/actions/recipe';
import Image from 'next/image';
import Link from 'next/link';

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const recipe = await getRecipe(id);
  const relatedRecipes = await getRecipes({ category: recipe.strCategory });

  const handleIngredients = () => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = (recipe as any)[`strIngredient${i}`];
      const measure = (recipe as any)[`strIngredient${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push({ name: ingredient, measure });
      }
    }
    return ingredients;
  };

  const ingredients = handleIngredients();

  return (
    <div className="recipe">
      {/* Left side */}
      <div className="info">
        <Image
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          width={400}
          height={300}
          className="rounded-lg"
        />
        <h1>{recipe.strMeal}</h1>

        <Link
          href={`/?area=${recipe.strArea}`}
          className="area-link"
        >
          From: {recipe.strArea}
        </Link>

        <div className="instructions">
          <h2>Instructions</h2>
          <p>{recipe.strInstructions}</p>
        </div>

        <div className="ingredients">
          <h2>Ingredients</h2>
          <ul className="ingredients-list">
            {ingredients.map((ing, idx) => (
              <li key={idx}>
                <Link
                  href={`/?ingredient=${encodeURIComponent(ing.name)}`}
                >
                  {ing.name}
                </Link>{' '}
                — {ing.measure}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right sidebar */}
      <aside className="sidebar">
        <h2>More in {recipe.strCategory}</h2>
        <ul className="related-recipes">
          {relatedRecipes
            .filter((r) => r.idMeal !== recipe.idMeal)
            .map((r) => (
              <li key={r.idMeal}>
                <Link
                  href={`/recipe/${r.idMeal}`}
                >
                  {r.strMeal}
                </Link>
              </li>
            ))}
        </ul>
      </aside>
    </div>
  );
};

export default Page;