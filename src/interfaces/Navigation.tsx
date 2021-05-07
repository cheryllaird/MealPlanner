import { Recipe } from "./Recipes";

export type RecipeRootStackParamList = {
    "Recipe List": undefined;
    "Recipe Detail": {
        recipe: Recipe
    };
};

export type MealPlanRootStackParamList = {
    "Meal Plan": undefined;
    "Recipe Detail": {
        recipe: Recipe
    };
};
