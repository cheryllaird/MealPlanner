import React from "react";
import {
    StyleSheet,
    SectionList,
    Text,
} from "react-native";
import moment from "moment";
import ramenImage from "../../assets/ramen.png";
import { theme } from "../theme";
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

export function MealPlanList({ route }): React.ReactElement {
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
        let day;

        switch (route.name) {
            case "This Week":
                day = moment.unix(date).format("dddd");
                break;

            default:
                day = moment.unix(date).format("dddd, Do MMM YYYY");
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
                keyExtractor={(item, index) => `${item.id}.${index}`}
                renderItem={({ item }) => <RecipeSummary recipe={item} />}
                renderSectionHeader={({ section: { title } }) => renderHeader(title)}
            />
        </>
    );
}
