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

export function useMealPlan(constraint: string): ReturnTypes {
    const [mealPlan, setMealPlan] = useState<MealPlanEntry[]>([]);

    function parseMealPlanData(data: MealPlanAPIData | null = null): MealPlanEntry[] {
        if (data === null) return [];
        return Object.entries(data).map(([date, recipesData]) => ({
            title: date,
            data: Object.values(recipesData).map((d) => ({ ...d, date })),
        }));
    }

    useEffect(() => {
        const startOfThisWeek = moment().startOf("isoWeek").format("YYYYMMDD");
        const endOfThisWeek = moment().endOf("isoWeek").format("YYYYMMDD");
        const startOfNextWeek = moment(endOfThisWeek).add(1).format("YYYYMMDD");
        const endOfLastWeek = moment(startOfThisWeek).subtract(1).format("YYYYMMDD");

        let onValueChange: (a: firebase.database.DataSnapshot, b?: string | null | undefined) => void;

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
