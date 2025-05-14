import Image from "next/image";
import Link from "next/link";

interface Props {
  recipe: Recipe;
}

const RecipeCard = ({ recipe }: Props) => (
    <Link
      key={recipe.idMeal}
      href={`/recipe/${recipe.idMeal}`}
      className="max-w-[320px] border rounded-lg p-4 hover:shadow-md transition flex flex-col items-center"
    >
      <h2 className="text-lg font-semibold mb-2">{recipe.strMeal}</h2>
      <Image
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        width={300}
        height={200}
        className="rounded-lg object-cover"
      />
    </Link>
)

export default RecipeCard;