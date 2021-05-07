import React from "react";
import {
    FlatList,
} from "react-native";
import searchImage from "../../assets/search.png";
import { Placeholder } from "../components/Placeholder";
import { RecipeSummary } from "./RecipeSummary";
import { useRecipes } from "./useRecipes";

export function RecipeList(): React.ReactElement {
    const {
        recipes,
        isLoading,
        hasErrored,
    } = useRecipes();

    if (isLoading) {
        return (
            <Placeholder
                message="Loading"
            />
        );
    }
    if (hasErrored) {
        return (
            <Placeholder
                message="Oops, something went wrong."
            />
        );
    }

    if (!Object.keys(recipes).length) {
        return (
            <Placeholder
                image={searchImage}
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
