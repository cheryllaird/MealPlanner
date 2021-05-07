import { useState, useEffect } from "react";
import { firebase } from "../firebase/config";
import { Recipe } from "../interfaces/Recipes";
import { USER_ID } from "../consts";

interface MealPlanAPIData {
    [key: string]: {
        [key: string]: Recipe
    }
}

interface MealPlanEntry {
    title: string;
    data: Recipe[];
}

interface ReturnTypes {
    mealPlan: MealPlanEntry[],
}

export function useMealPlan(): ReturnTypes {
    const [mealPlan, setMealPlan] = useState<MealPlanEntry[]>([]);

    function parseMealPlanData(data: MealPlanAPIData | null = null): MealPlanEntry[] {
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
