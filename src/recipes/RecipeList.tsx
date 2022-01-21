import React from "react";
import {
    StyleSheet,
    Animated,
} from "react-native";
import { disableExpoTranslucentStatusBar, useCollapsibleHeader } from "react-navigation-collapsible";
import searchImage from "../../assets/search.png";
import { Placeholder } from "../components/Placeholder";
import { theme } from "../theme";
import { RecipeSummary } from "./RecipeSummary";
import { RecipesHeader } from "./RecipesHeader";
import { SearchBox } from "./SearchBox";
import { useRecipes } from "./useRecipes";

disableExpoTranslucentStatusBar();

const styles = StyleSheet.create({
    searchContainer: {
        alignItems: "center",
        backgroundColor: theme.BACKGROUND,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 30,
        paddingVertical: 10,
        position: "absolute",
        width: "100%",
    },
});

export function RecipeList(): React.ReactElement {
    const options = {
        navigationOptions: {
            header: () => <RecipesHeader />, // eslint-disable-line react/display-name
        },
    };
    const {
        onScroll,
        translateY,
        containerPaddingTop,
        scrollIndicatorInsetTop,
    } = useCollapsibleHeader(options);

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
    const searchContainerHeight = 65;

    return (
        <>
            <Animated.FlatList
                onScroll={onScroll}
                contentContainerStyle={{ paddingTop: containerPaddingTop + searchContainerHeight }}
                scrollIndicatorInsets={{ top: scrollIndicatorInsetTop }}
                data={recipesWithId}
                renderItem={({ item }) => <RecipeSummary recipe={item} />}
                keyExtractor={(item) => item.title}
            />

            <Animated.View
                style={[styles.searchContainer, {
                    transform: [{ translateY }],
                    top: containerPaddingTop,
                    height: searchContainerHeight,
                }]}
            >
                <SearchBox />
            </Animated.View>
        </>
    );
}
