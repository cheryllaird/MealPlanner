import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { RecipeList } from "./recipes/RecipeList";
import { RecipeDetail } from "./recipes/RecipeDetail";
import { AddRecipe } from "./recipes/AddRecipe";
import { RecipeRootStackParamList } from "./interfaces/Navigation";

const Stack = createStackNavigator<RecipeRootStackParamList>();

export function RecipesScreen(): React.ReactElement {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Recipes" component={RecipeList} />
            <Stack.Screen name="Recipe Detail" component={RecipeDetail} />
            <Stack.Screen name="Add Recipe" component={AddRecipe} />
        </Stack.Navigator>
    );
}
