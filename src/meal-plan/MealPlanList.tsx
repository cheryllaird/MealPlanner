import React from "react";
import {
    StyleSheet,
    SectionList,
    Text,
} from "react-native";
import ramenImage from "../../assets/ramen.png";
import { theme } from "../theme";
import { RecipeSummary } from "../recipes/RecipeSummary";
import { Placeholder } from "../components/Placeholder";
import { useMealPlan } from "./useMealPlan";

const styles = StyleSheet.create({
    heading: {
        alignItems: "center",
        backgroundColor: theme.PRIMARY,
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
    },
});

export function MealPlanList(): React.ReactElement {
    const { mealPlan } = useMealPlan();

    if (!mealPlan.length) {
        return (
            <Placeholder
                image={ramenImage}
                message="Uhoo, looks like we are ordering a takeaway."
                cta={{ text: "Browse recipes", route: "Recipes" }}
            />
        );
    }

    return (
        <>
            <SectionList
                sections={mealPlan}
                keyExtractor={(item, index) => `${item.id}.${index}`}
                renderItem={({ item }) => <RecipeSummary recipe={item} />}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={styles.heading}>{title}</Text>
                )}
            />
        </>
    );
}
