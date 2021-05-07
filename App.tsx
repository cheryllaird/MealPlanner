import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
    Platform,
    NativeModules,
    StyleSheet,
    SafeAreaView,
    Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { PAGES } from "./src/consts";
import { StatusBar } from 'expo-status-bar';
import { MealPlanScreen } from "./src/MealPlanScreen";
import { ShoppingScreen } from "./src/ShoppingScreen";
import { RecipesScreen } from "./src/RecipesScreen";

// import { resetTestData } from "./src/api/api";
// resetTestData();

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <SafeAreaView style={styles.safeAreaView}>
            <StatusBar style="dark" />

            <NavigationContainer
                linking={undefined}
                fallback={<Text>Loading...</Text>}
            >
                <Tab.Navigator initialRouteName={PAGES.RECIPES}>
                    <Tab.Screen name={PAGES.RECIPES} component={RecipesScreen} options={{
                        tabBarIcon: ({ color, size }) => (
                            <Icon name="pizza-slice" color={color} size={size} />
                        )
                    }}/>
                    <Tab.Screen name={PAGES.MENU} component={MealPlanScreen} options={{
                        tabBarIcon: ({ color, size }) => (
                            <Icon name="utensils" color={color} size={size} />
                        )
                    }}/>
                    <Tab.Screen name={PAGES.SHOPPING} component={ShoppingScreen} options={{
                        tabBarIcon: ({ color, size }) => (
                            <Icon name="shopping-cart" color={color} size={size} />
                        )
                    }}/>
                </Tab.Navigator>

            </NavigationContainer>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? NativeModules.StatusBarManager.HEIGHT : 0
    },
});
