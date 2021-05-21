import { useState, useEffect } from "react";
import moment from "moment";
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

export function useMealPlan(constraint): ReturnTypes {
    const [mealPlan, setMealPlan] = useState<MealPlanEntry[]>([]);

    function parseMealPlanData(data: MealPlanAPIData | null = null): MealPlanEntry[] {
        if (data === null) return [];

        return Object.entries(data).map(([date, recipesData]) => ({
            title: date,
            data: Object.values(recipesData),
        }));
    }

    useEffect(() => {
        const startOfThisWeek = moment().startOf("isoWeek").format("X");
        const endOfThisWeek = moment().endOf("isoWeek").format("X");
        const startOfNextWeek = moment.unix(endOfThisWeek).add(1).format("X");
        const endOfLastWeek = moment.unix(startOfThisWeek).subtract(1).format("X");

        let onValueChange;

        switch (constraint) {
        case "This Week":
            onValueChange = firebase.database()
                .ref(`/users/${USER_ID}/meal-plan`)
                .orderByKey()
                .startAt(startOfThisWeek)
                .endAt(endOfThisWeek)
                .on("value", (data) => {
                    setMealPlan(parseMealPlanData(data.val()));
                });
            break;

        case "Upcoming":
            onValueChange = firebase.database()
                .ref(`/users/${USER_ID}/meal-plan`)
                .orderByKey()
                .startAt(startOfNextWeek)
                .on("value", (data) => {
                    setMealPlan(parseMealPlanData(data.val()));
                });
            break;

        case "Past":
            onValueChange = firebase.database()
                .ref(`/users/${USER_ID}/meal-plan`)
                .orderByKey()
                .endAt(endOfLastWeek)
                .on("value", (data) => {
                    setMealPlan(parseMealPlanData(data.val()));
                });
            break;

        default:
            break;
        }

        return () => firebase.database()
            .ref(`/users/${USER_ID}/meal-plan`)
            .off("value", onValueChange);
    }, []);

    return {
        mealPlan,
    };
}
