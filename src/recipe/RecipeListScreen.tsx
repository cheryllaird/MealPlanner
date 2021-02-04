import React from "react";
import {
    FlatList,
} from "react-native";
import { RecipeSummary } from "./RecipeSummary";
import { useRecipes } from "./useRecipes";

export function RecipeListScreen(): React.ReactElement {
    const { recipes } = useRecipes();

    return (
        <FlatList
            data={Object.values(recipes)}
            renderItem={({ item }) => <RecipeSummary recipe={item} />}
            keyExtractor={(item) => item.title}
        />
    );
}
