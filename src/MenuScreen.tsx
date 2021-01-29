import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    SectionList,
    Text,
    Button,
} from 'react-native';
import { firebase } from './firebase/config';
import { RecipeSummary } from "./recipe/RecipeSummary";
import { STORAGE_KEYS, USER_ID } from "./consts";

export function MenuScreen({ navigation, route }) {
    const [mealPlan, setMealPlan] = useState([]);
    const [recipes, setRecipes] = useState({});

    function parseMealPlanData(data) {
        return Object.entries(data).map(([date, meals]) => ({ title: date, data: Object.values(meals) }));
    }
    function parseRecipesData(data) {
        return {};
    }

    useEffect(() => {
        const onValueChange = firebase.database()
            .ref(`/users/${USER_ID}/meal-plan`)
            .orderByKey()
            .on('value', data => {
                setMealPlan(parseMealPlanData(data.val()))
            });

        return () =>
            firebase.database()
                .ref(`/users/${USER_ID}/meal-plan`)
                .off('value', onValueChange);
    }, []);

    useEffect(() => {
        const onValueChange = firebase.database()
            .ref("/recipes")
            .on('value', data => {
                setRecipes(parseRecipesData(data.val()))
            });

        // Stop listening for updates when no longer required
        return () =>
            firebase.database()
                .ref("/recipes")
                .off('value', onValueChange);
    }, [mealPlan]);

    function onAddMeal() {
        alert("NEW MEAL")
    }

    console.log(mealPlan);


    return (
        <>
            <SectionList
                sections={mealPlan}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => <RecipeSummary recipe={item} />}
                renderSectionHeader={({ section: { date } }) => (
                    <Text style={styles.heading}>{date}</Text>
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
