import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type Props = {
  params: { id: string };
};

const getRecipeDetails = async (id: string) => {
  const res = await fetch(`http://localhost:3001/recipes/${id}`, { cache: 'no-store' });
  const data = await res.json();
  return data.meals[0];
};

const getRelatedRecipes = async (category: string) => {
  const res = await fetch(`http://localhost:3001/recipes?category=${category}`, { cache: 'no-store' });
  const data = await res.json();
  return data.meals;
};

const Page = async ({ params }: Props) => {
  const recipe = await getRecipeDetails(params.id);
  const relatedRecipes = await getRelatedRecipes(recipe.strCategory);

  const getIngredients = () => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push({ name: ingredient, measure });
      }
    }
    return ingredients;
  };

  const ingredients = getIngredients();

  return (
    <div className="flex flex-col md:flex-row p-6 gap-6">
      {/* Left side */}
      <div className="md:w-2/3">
        <Image
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          width={400}
          height={300}
          className="rounded-lg"
        />
        <h1 className="text-3xl font-bold mt-4">{recipe.strMeal}</h1>

        <Link
          href={`/?area=${recipe.strArea}`}
          className="text-blue-500 underline mt-2 block"
        >
          From: {recipe.strArea}
        </Link>

        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Instructions</h2>
          <p className="text-gray-700 whitespace-pre-wrap">{recipe.strInstructions}</p>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
          <ul className="list-disc list-inside">
            {ingredients.map((ing, idx) => (
              <li key={idx}>
                <Link
                  href={`/?ingredient=${encodeURIComponent(ing.name)}`}
                  className="text-blue-600 hover:underline"
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
      <aside className="md:w-1/3 border-l pl-4">
        <h2 className="text-xl font-bold mb-4">More in {recipe.strCategory}</h2>
        <ul className="space-y-2">
          {relatedRecipes
            .filter((r: any) => r.idMeal !== recipe.idMeal)
            .map((r: any) => (
              <li key={r.idMeal}>
                <Link
                  href={`/recipe/${r.idMeal}`}
                  className="text-blue-600 hover:underline"
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