import { useState, useEffect, useRef } from "react";
import { firebase } from "../firebase/config";
import { Recipe } from "../interfaces/Recipes";
import { USER_ID } from "../consts";

interface MealPlanData {
    [key: string]: {
        [key: string]: string
    }
}

interface MealPlanEntry {
    title: string;
    data: Recipe[];
}
interface MealPlanEntryIds {
    title: string;
    data: string[];
}

export function useMealPlan(): { mealPlan: MealPlanEntry[] } {
    const [mealPlan, setMealPlan] = useState<MealPlanEntryIds[]>([]);
    // const dbListeners = useRef([]);

    function parseMealPlanData(data: MealPlanData | null = null): MealPlanEntryIds[] {
        if (data === null) return [];

        return Object.entries(data).map(([date, recipesData]) => ({
            title: date,
            data: Object.values(recipesData).map((recipeId) => recipeId),
        }));
    }

    function parseMealPlanData2(data: MealPlanData | null = null): MealPlanEntryIds[] {
        if (data === null) return;

        Object.entries(data).forEach((cb, [date, recipesData]) => ({
            title: date,
            data: Object.values(recipesData).forEach((recipeId) => {
                console.log(recipeId);

                const recipeRef = firebase.database()
                    .ref(`/recipes/${recipeId}`)
                    .on("value", cb);
                // dbListeners.current.push(recipeRef);
            }),
        }));
    }

    useEffect(() => {
        function getRecipeData(cb) {
            const mealPlanListener = firebase.database()
                .ref(`/users/${USER_ID}/meal-plan`)
                .orderByKey()
                .on("value", (data) => {
                    parseMealPlanData2(cb, data.val());
                });
            // dbListeners.current.push(mealPlanListener)
        }

        getRecipeData((data) => {
            console.log(3, data.val());
        });

        const onValueChange = firebase.database()
            .ref(`/users/${USER_ID}/meal-plan`)
            .orderByKey()
            .on("value", (data) => {
                setMealPlan(parseMealPlanData(data.val()));
            });

        return () => firebase.database()
            .ref(`/users/${USER_ID}/meal-plan`)
            .off("value", onValueChange);
    }, []);

    return {
        mealPlan,
    };
}
