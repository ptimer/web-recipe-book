import Image from "next/image";
import Link from "next/link";

interface Props {
  recipe: Recipe;
}

const RecipeCard = ({ recipe }: Props) => (
    <Link
      key={recipe.idMeal}
      href={`/recipe/${recipe.idMeal}`}
      className="recipe-card"
    >
      <h2>{recipe.strMeal}</h2>
      <Image
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        width={300}
        height={200}
      />
    </Link>
)

export default RecipeCard;