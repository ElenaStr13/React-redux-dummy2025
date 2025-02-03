import {createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import {axiosInstance} from "../../service/api.service.ts";
import {IRecipes} from "../../models/IRecipes.ts";
import {IRecipesResponseModel} from "../../models/IRecipesResponseModel.ts";


interface RecipesState {
    recipes: IRecipes[];
    recipe: IRecipes | null;
    loading: boolean;
    error: string | null;
    total: number;
    limit: number;
    skip: number;
}
const initialState:RecipesState = {
    recipes: [],
    recipe: null,
    loading: false,
    error: null,
    total: 0,
    limit: 10,
    skip: 0,
};

// Завантаження рецептів
export const fetchRecipes = createAsyncThunk<
    IRecipesResponseModel,
    { skip: number; limit: number },
    { rejectValue: string }>(
    "recipes", async ({ skip, limit }, thunkAPI) => {
    try {
        const response = await axiosInstance.get<IRecipesResponseModel>(
            `/recipes?skip=${skip}&limit=${limit}`);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue("Не вдалося завантажити рецепти");
    }
});

// Завантаження одного рецепта
export const fetchRecipeById = createAsyncThunk<IRecipes, number, { rejectValue: string }>(
    "recipes/fetchRecipeById",
    async (id, thunkAPI) => {
        try {
            const response = await axiosInstance.get<IRecipes>(`/recipes/${id}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue("Не вдалося завантажити рецепт");
        }
    }
);

const recipesSlice = createSlice({
    name: "recipesSlice",
    initialState,
    reducers: {
        setRecipesPage: (state, action: PayloadAction<number>) => {
            state.skip = action.payload * state.limit;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRecipes.fulfilled, (state: RecipesState, action: PayloadAction<IRecipesResponseModel>) => {
                state.loading = false;
                state.recipes = action.payload.recipes;
                state.total = action.payload.total;
            })
        builder
            .addCase(fetchRecipeById.fulfilled, (state: RecipesState, action: PayloadAction<IRecipesResponseModel>) => {
                state.loading = false;
                state.recipe = action.payload;
            })
    },
});
export const recipeActions = {
    ...recipesSlice.actions, fetchRecipes, fetchRecipeById
}
export const { setRecipesPage } = recipesSlice.actions;
export default recipesSlice.reducer;