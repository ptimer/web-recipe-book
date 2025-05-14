"use server";

import { getEnv } from "../utils";

// const API_URL = getEnv('API_URL');
const API_URL = "http://localhost:3001/recipes";

const buildURL = ({ category, ingredient, area }: RecipeSearchParams) => {
  const params = new URLSearchParams();

  if (category) params.append('category', category);
  if (ingredient) params.append('ingredient', ingredient);
  if (area) params.append('area', area);

  return params.toString() ? `${API_URL}?${params.toString()}` : API_URL;
};

// TODO: try catch
export const getRecipes = async (params: RecipeSearchParams) => {
    const url = buildURL(params);

    const res = await fetch(url, { cache: 'no-store' });

    if (!res.ok) {
        throw new Error('Failed to fetch recipes');
    }

    const data = await res.json();
    return data.meals as Recipe[];
};

// TODO: try catch
export const getRecipe = async (id: string) => {
  const res = await fetch(`${API_URL}/${id}`, { cache: 'no-store' });

  if (!res.ok) {
        throw new Error('Failed to fetch recipe');
    }

  const data = await res.json();
  return data.meals[0] as Recipe;
};
