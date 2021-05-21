import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { MealPlan } from "./meal-plan/MealPlan";
import { RecipeDetail } from "./recipes/RecipeDetail";
import { MealPlanRootStackParamList } from "./interfaces/Navigation";

const Stack = createStackNavigator<MealPlanRootStackParamList>();

export function MealPlanScreen(): React.ReactElement {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Meal Plan" component={MealPlan} options={{ headerShown: false }} />
            <Stack.Screen name="Recipe Detail" component={RecipeDetail} />
        </Stack.Navigator>
    );
}
