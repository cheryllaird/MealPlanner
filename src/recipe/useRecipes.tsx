import React, { useState, useEffect } from 'react';
import { firebase } from '../firebase/config';

export function useRecipes() {
    const [recipes, setRecipes] = useState([]);

    function parseRecipesData(data) {
        const parsedRecipes = {};
        Object.entries(data).forEach(([key, value]) => {
            parsedRecipes[key] = value;
        });
        return parsedRecipes;
    }

    useEffect(() => {
        const recipeListener = firebase.database()
            .ref("/recipes")
            .on('value', data => {
                setRecipes(parseRecipesData(data.val()));
            });

        return () =>
            firebase.database()
                .ref("/recipes")
                .off('value', recipeListener);
    }, []);

    return {
        recipes
    };
}
