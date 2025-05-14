import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type SearchParams = {
  category?: string;
  ingredient?: string;
  area?: string;
};

const buildURL = ({ category, ingredient, area }: SearchParams) => {
  const baseURL = 'http://localhost:3001/recipes';
  const params = new URLSearchParams();

  if (category) params.append('category', category);
  if (ingredient) params.append('ingredient', ingredient);
  if (area) params.append('area', area);

  return params.toString() ? `${baseURL}?${params.toString()}` : baseURL;
};

const getRecipes = async (params: SearchParams) => {
  const url = buildURL(params);
  const res = await fetch(url, { cache: 'no-store' });

  if (!res.ok) {
    throw new Error('Failed to fetch recipes');
  }

  const data = await res.json();
  return data.meals;
};

const getTitle = ({ category, ingredient, area }: SearchParams) => {
  if (category) return `Recipes in Category: ${category}`;
  if (ingredient) return `Recipes with Ingredient: ${ingredient}`;
  if (area) return `Recipes from: ${area}`;
  return 'All Recipes';
};

const Page = async ({ searchParams }: { searchParams: SearchParams }) => {
  const meals = await getRecipes(searchParams);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{getTitle(searchParams)}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {meals?.map((meal: any) => (
          <Link
            key={meal.idMeal}
            href={`/recipe/${meal.idMeal}`}
            className="border rounded-lg p-4 hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold mb-2">{meal.strMeal}</h2>
            <Image
              src={meal.strMealThumb}
              alt={meal.strMeal}
              width={300}
              height={200}
              className="rounded-lg object-cover"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Page;