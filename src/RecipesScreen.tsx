import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { RecipeListScreen } from "./recipe/RecipeListScreen";
import { RecipeDetailScreen } from "./recipe/RecipeDetailScreen";
import { RecipeRootStackParamList } from "./interfaces/Navigation";

const Stack = createStackNavigator<RecipeRootStackParamList>();

export function RecipesScreen(): React.ReactElement {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Recipe List" component={RecipeListScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Recipe Detail" component={RecipeDetailScreen} />
        </Stack.Navigator>
    );
}
