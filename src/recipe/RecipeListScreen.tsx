import React from "react";
import {
    FlatList,
} from "react-native";
import { Placeholder } from "../components/Placeholder";
import { RecipeSummary } from "./RecipeSummary";
import { useRecipes } from "./useRecipes";

export function RecipeListScreen(): React.ReactElement {
    const { recipes } = useRecipes();

    if (!Object.keys(recipes).length) {
        return (
            <Placeholder
                image={require("../../assets/search.png")}
                message="Oops, it is looking a little empty here."
            />
        );
    }

    const recipesWithId = Object.keys(recipes).map((id) => ({ ...recipes[id], id }));

    return (
        <FlatList
            data={recipesWithId}
            renderItem={({ item }) => <RecipeSummary recipe={item} />}
            keyExtractor={(item) => item.title}
        />
    );
}
