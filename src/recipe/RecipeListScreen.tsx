import React from "react";
import {
    FlatList,
} from "react-native";
import { RecipeSummary } from "./RecipeSummary";
import { useRecipes } from "./useRecipes";

export function RecipeListScreen(): React.ReactElement {
    const { recipes } = useRecipes();
    const recipesWithId = Object.keys(recipes).map((id) => ({ ...recipes[id], id }));

    return (
        <FlatList
            data={recipesWithId}
            renderItem={({ item }) => <RecipeSummary recipe={item} />}
            keyExtractor={(item) => item.title}
        />
    );
}
