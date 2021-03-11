import React from "react";
import {
    FlatList,
    Image,
    Text,
    View,
    StyleSheet,
} from "react-native";
import { RecipeSummary } from "./RecipeSummary";
import { useRecipes } from "./useRecipes";

const styles = StyleSheet.create({
    image: {
        height: 250,
        maxWidth: "100%",
        width: 250,
    },
    placeholder: {
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
    placeholderText: {
        color: "grey",
        fontSize: 16,
        marginBottom: 40,
    },
});

export function RecipeListScreen(): React.ReactElement {
    const { recipes } = useRecipes();

    if (!Object.keys(recipes).length) {
        return (
            <View style={styles.placeholder}>
                <Image
                    style={styles.image}
                    source={require("../../assets/search.png")}
                />
                <Text style={styles.placeholderText}>Oops, it is looking a little empty here.</Text>
            </View>
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
