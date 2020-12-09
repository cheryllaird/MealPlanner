import React, { useState } from 'react';
import {
    StyleSheet,
    SectionList,
    Text,
    Button,
} from 'react-native';
import { RecipeSummary } from "./recipe/RecipeSummary";

export function MenuScreen({ navigation, route }) {
    const [mealPlan, setMealPlan] = useState([
        { title: "Monday", data: [{ title: "BOO" }, { title: "ARR" }] },
        { title: "Tuesday", data: [{ title: "BOO" }] },
        { title: "Wednesday", data: [{ title: "BOO" }] },
        { title: "Thursday", data: [{ title: "BOO" }] },
        { title: "Friday", data: [{ title: "BOO" }] },
        { title: "Saturday", data: [{ title: "BOO" }] },
        { title: "Sunday", data: [{ title: "BOO" }] },
    ]);

    function onAddMeal() {
        alert("NEW MEAL")
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

            <Button title="Add meal" onPress={onAddMeal} />
        </>
    );
};

const styles = StyleSheet.create({
    heading: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "yellow",
        padding: 10,
    },
});
