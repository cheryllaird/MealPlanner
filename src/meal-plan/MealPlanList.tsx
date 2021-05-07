import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    SectionList,
    Text,
    Button,
} from "react-native";
import { firebase } from "../firebase/config";
import { RecipeSummary } from "../recipes/RecipeSummary";
import { Placeholder } from "../components/Placeholder";
import { USER_ID } from "../consts";
import { useMealPlan } from "./useMealPlan";

const styles = StyleSheet.create({
    heading: {
        alignItems: "center",
        backgroundColor: "yellow",
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
                image={require("../../assets/ramen.png")}
                message="Uhoo, looks like we are ordering a takeaway."
                cta={{ text: "Browse recipes", route: "Recipes" }}
            />
        );
    }

    return (
        <>
            <SectionList
                sections={mealPlan}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => <RecipeSummary recipe={item} />}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={styles.heading}>{title}</Text>
                )}
            />
        </>
    );
}
