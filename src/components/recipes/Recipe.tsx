import {IRecipes} from "../../models/IRecipes.ts";
import {Link} from "react-router-dom";

interface RecipeProps {
    recipe: IRecipes;
}

const Recipe = ({ recipe }: RecipeProps) => {
    return (
        <li>
            <Link to={`/recipes/${recipe.id}`}>
                <h4>{recipe.name}</h4>
            </Link>
            <p>Теги: {recipe.tags.join(", ")}</p>
        </li>
    );
};

export default Recipe;