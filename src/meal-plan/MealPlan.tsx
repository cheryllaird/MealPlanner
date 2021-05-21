import * as React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { MealPlanList } from "./MealPlanList";
import { MealPlanWeekStackParamList } from "../interfaces/Navigation";

const Tab = createMaterialTopTabNavigator<MealPlanWeekStackParamList>();

export function MealPlan(): React.ReactElement {
    return (
        <Tab.Navigator>
            <Tab.Screen name="This Week" component={MealPlanList} />
            <Tab.Screen name="Upcoming" component={MealPlanList} />
            <Tab.Screen name="Past" component={MealPlanList} />
        </Tab.Navigator>
    );
}
