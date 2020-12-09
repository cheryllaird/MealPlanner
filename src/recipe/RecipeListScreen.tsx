import * as React from 'react';
import {
    FlatList,
} from 'react-native';
import data from "../../data/recipes.json";
import { RecipeSummary } from "./RecipeSummary";

export function RecipeListScreen({ navigation }) {
    return (
        <FlatList
            data={data.recipes}
            renderItem={({ item }) => <RecipeSummary recipe={item} />}
            keyExtractor={item => item.title}
        />
    );
};
