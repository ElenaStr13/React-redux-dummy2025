import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../types";
import {useEffect} from "react";
import {fetchRecipeById} from "../../redux";

const RecipeDetails = () => {
    const { id } = useParams<{ id: string }>(); // Отримуємо `id` з URL
    const dispatch = useDispatch<AppDispatch>();
    const { recipe, loading, error } = useSelector((state: RootState) => state.recipes);

    useEffect(() => {
        if (id) dispatch(fetchRecipeById(Number(id))); // Завантажуємо рецепт за `id`
    }, [dispatch, id]);

    if (loading) return <p>Завантаження...</p>;
    if (error) return <p>Помилка: {error}</p>;
    if (!recipe) return <p>Рецепт не знайдено.</p>;

    return (
        <div>
            <h2>{recipe.name}</h2>
            <p><strong>Кухня:</strong> {recipe.cuisine}</p>
            <p><strong>Час приготування:</strong> {recipe.prepTimeMinutes} хв</p>
            <p><strong>Інгредієнти:</strong> {recipe.ingredients.join(", ")}</p>
            <p><strong>Інструкція:</strong> {recipe.instructions.join(". ")}</p>
            <img src={recipe.image} alt={recipe.name} width="200" />
        </div>
    );
};

export default RecipeDetails;