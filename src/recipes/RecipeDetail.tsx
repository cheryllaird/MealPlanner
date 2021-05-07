import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Button,
    Image,
    FlatList,
} from "react-native";
import { RouteProp } from "@react-navigation/native";
import DateTimePicker, { Event } from "@react-native-community/datetimepicker";
import { addToMealPlan } from "../api/api";
import { RecipeRootStackParamList } from "../interfaces/Navigation";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        padding: 5,
    },
    image: {
        height: 100,
        width: "100%",
    },
    listHeader: {
        fontWeight: "bold",
        marginBottom: 5,
        marginTop: 15,
    },
    serves: {
        opacity: 0.7,
    },
    time: {
        opacity: 0.7,
    },
    title: {
        fontSize: 20,
        marginBottom: 5,
    },
});

type RecipeDetailRouteProp = RouteProp<
    RecipeRootStackParamList,
    "Recipe Detail"
>;

type Props = {
    route: RecipeDetailRouteProp;
};

export function RecipeDetail({ route }: Props): React.ReactElement {
    const { recipe } = route.params;
    const [datePickerIsVisible, setDatePickerVisibility] = useState(false);

    function onAddMeal(event: Event, date: Date | null = null): void {
        setDatePickerVisibility(false);
        if (date === null) return;
        if (!recipe.id) return;
        addToMealPlan(date, recipe.id);
    }

    function openModal() {
        setDatePickerVisibility(true);
    }

    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={{ uri: recipe.img }}
            />
            <View style={styles.content}>
                <Text style={styles.title}>{recipe.title}</Text>
                <Text style={styles.serves}>
                    {recipe.serves}
                    {" "}
                    people
                </Text>
                <Text style={styles.time}>
                    {recipe.totalTime}
                    {" "}
                    minutes
                </Text>

                <FlatList
                    data={recipe.ingredients}
                    ListHeaderComponent={() => <Text style={styles.listHeader}>Ingredients</Text>}
                    renderItem={({ item }) => (
                        <Text>
                            {item.qty}
                            {item.measurement === "item" ? "x" : item.measurement}
                            {" "}
                            {item.title}
                        </Text>
                    )}
                    keyExtractor={(item) => item.title}
                />
            </View>

            {datePickerIsVisible && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={new Date()}
                    mode="date"
                    display="default"
                    onChange={onAddMeal}
                />
            )}

            <Button title="Add to menu" onPress={openModal} />
        </View>
    );
}
