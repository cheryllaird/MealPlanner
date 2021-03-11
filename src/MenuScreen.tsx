import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    SectionList,
    Text,
    Button,
} from "react-native";
import { firebase } from "./firebase/config";
import { useRecipes } from "./recipe/useRecipes";
import { RecipeSummary } from "./recipe/RecipeSummary";
import { Placeholder } from "./components/Placeholder";
import { USER_ID } from "./consts";

const styles = StyleSheet.create({
    heading: {
        alignItems: "center",
        backgroundColor: "yellow",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
    },
});

interface MealPlanData {
    [key: string]: {
        [key: string]: string
    }
}

interface MealPlanEntry {
    title: string;
    data: string[];
}

export function MenuScreen(): React.ReactElement {
    const [mealPlan, setMealPlan] = useState<MealPlanEntry[]>([]);
    const { recipes } = useRecipes();

    function parseMealPlanData(data: MealPlanData | null = null): MealPlanEntry[] {
        if (data === null) return [];
        return Object.entries(data).map(([date, recipesData]) => ({
            title: date,
            data: Object.values(recipesData),
        }));
    }

    useEffect(() => {
        const onValueChange = firebase.database()
            .ref(`/users/${USER_ID}/meal-plan`)
            .orderByKey()
            .on("value", (data) => {
                const d = parseMealPlanData(data.val());
                setMealPlan(d);
            });

        return () => firebase.database()
            .ref(`/users/${USER_ID}/meal-plan`)
            .off("value", onValueChange);
    }, []);

    function onAddMeal() {
        alert("NEW MEAL");
    }

    if (!mealPlan.length) {
        return (
            <Placeholder
                image={require("../assets/ramen.png")}
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
                renderItem={({ item }) => <RecipeSummary recipe={recipes[item]} />}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={styles.heading}>{title}</Text>
                )}
            />

            <Button title="Add meal" onPress={onAddMeal} />
        </>
    );
}
