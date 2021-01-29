import React, { useState, useEffect } from 'react';
import {
    FlatList,
} from 'react-native';
import { firebase } from '../firebase/config';
import { RecipeSummary } from "./RecipeSummary";

export function RecipeListScreen({ navigation }) {
    const [recipes, setRecipes] = useState([]);

    function parseRecipesData(data) {
        return Object.entries(data).map(([key, value]) => {
            return { ...value, id: key }
        });
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

    return (
        <FlatList
            data={recipes}
            renderItem={({ item }) => <RecipeSummary recipe={item} />}
            keyExtractor={item => item.title}
        />
    );
};
