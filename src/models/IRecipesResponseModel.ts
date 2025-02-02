import {IRecipes} from "./IRecipes.ts";

export type IRecipesResponseModel = {
    recipes:IRecipes[];
    total: number;
    skip: number;
    limit: number
}