import { Recipe } from "./Recipes";

export type RecipeRootStackParamList = {
    "Recipes": undefined;
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
export type MealPlanWeekStackParamList = {
    "This Week": undefined;
    "Upcoming": undefined
    "Past": undefined
};
