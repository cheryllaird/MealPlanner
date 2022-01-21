import React from "react";
import {
    StyleSheet,
    SectionList,
    Text,
} from "react-native";
import { RouteProp } from "@react-navigation/native";
import moment from "moment";
import ramenImage from "../../assets/ramen.png";
import { theme } from "../theme";
import { MealPlanWeekStackParamList } from "../interfaces/Navigation";
import { RecipeSummary } from "../recipes/RecipeSummary";
import { Placeholder } from "../components/Placeholder";
import { useMealPlan } from "./useMealPlan";

const styles = StyleSheet.create({
    heading: {
        alignItems: "center",
        backgroundColor: theme.BACKGROUND_ACCENT,
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
    },
});

type MealPlanRouteProp = RouteProp<
    MealPlanWeekStackParamList,
    "This Week" | "Upcoming" | "Past"
>;

type Props = {
    route: MealPlanRouteProp;
};

export function MealPlanList({ route }: Props): React.ReactElement {
    const { mealPlan } = useMealPlan(route.name);

    if (!mealPlan.length) {
        return (
            <Placeholder
                image={ramenImage}
                message="Uhoo, looks like we are ordering a takeaway."
                cta={{ text: "Browse recipes", route: "Recipes" }}
            />
        );
    }

    function renderHeader(date:string) {
        let day: string;

        switch (route.name) {
        case "This Week":
            day = moment(date).format("dddd");
            break;

        default:
            day = moment(date).format("dddd, Do MMM YYYY");
            break;
        }

        return (
            <Text style={styles.heading}>{day}</Text>
        );
    }

    return (
        <>
            <SectionList
                sections={mealPlan}
                keyExtractor={(item, index) => `${item.date}.${index}`}
                renderItem={({ item }) => <RecipeSummary recipe={item} />}
                renderSectionHeader={({ section: { title } }) => renderHeader(title)}
            />
        </>
    );
}
