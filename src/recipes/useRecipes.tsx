import { useState, useEffect } from "react";
import { firebase } from "../firebase/config";
import { RecipeList } from "../interfaces/Recipes";

export function useRecipes(): { recipes: RecipeList } {
    const [recipes, setRecipes] = useState<RecipeList>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [hasErrored, setHasErrored] = useState<boolean>(false);

    function parseRecipesData(data: RecipeList | null = null): RecipeList {
        if (data === null) return {};

        const parsedRecipes: RecipeList = {};
        Object.entries(data).forEach(([key, value]) => {
            parsedRecipes[key] = value;
        });
        return parsedRecipes;
    }

    useEffect(() => {
        setIsLoading(true);
        const recipeListener = firebase.database()
            .ref("/recipes")
            .on("value", (data) => {
                setRecipes(parseRecipesData(data.val()));
                setIsLoading(false);
            }, () => {
                setHasErrored(true);
                setIsLoading(false);
            });

        return () => firebase.database()
            .ref("/recipes")
            .off("value", recipeListener);
    }, []);

    return {
        recipes,
        isLoading,
        hasErrored,
    };
}
