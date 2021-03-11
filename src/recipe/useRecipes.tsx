import { useState, useEffect } from "react";
import { firebase } from "../firebase/config";
import { RecipeList } from "../interfaces/Recipes";

export function useRecipes(): { recipes: RecipeList } {
    const [recipes, setRecipes] = useState<RecipeList>({});

    useEffect(() => {
        const recipeListener = firebase.database()
            .ref("/recipes")
            .on("value", (data) => {
                setRecipes(data.val());
            });

        return () => firebase.database()
            .ref("/recipes")
            .off("value", recipeListener);
    }, []);

    return {
        recipes,
    };
}
