import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../types";
import {useEffect} from "react";
import {fetchRecipes} from "../../redux";
import Recipe from "./Recipe.tsx";
import {setPage} from "../../redux/slices/usersSlice.ts";
import Pagination from "../pagination/Pagination.tsx";
import {useSearchParams} from "react-router-dom";

const RecipesList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { recipes, loading, error, skip, limit, total } = useSelector(
        (state: RootState) => state.recipes ?? { recipes: [], loading: false, error: null }
    );
    const [searchParams] = useSearchParams();
    const query = searchParams.get("search") || "";

    useEffect(() => {
        dispatch(fetchRecipes({ skip, limit }));
    }, [dispatch, skip, limit]);


        const filteredRecipes = recipes?.filter((recipe) =>
        recipe.name.toLowerCase().includes(query.toLowerCase())
    );
    const totalPages = total > 0 ? Math.ceil(total / limit): 1;
    const currentPage = skip / limit + 1;

    return (
    <div>
        <h2>Список рецептів</h2>
        <ul>
            {filteredRecipes.map((recipe) => (
                <Recipe key={recipe.id} recipe={recipe} />
            ))}
        </ul>
        <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => dispatch(setPage(page - 1))}
        />
    </div>
);
};

export {RecipesList};