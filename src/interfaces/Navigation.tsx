import { Recipe } from "./Recipes";

export type RecipeRootStackParamList = {
    "Recipe List": undefined;
    "Recipe Detail": {
        recipe: Recipe
    };
};
