import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Button,
    Image,
    FlatList,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { addToMealPlan } from "../api/api";

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

export function RecipeDetailScreen({ navigation, route }) {
    const { recipe } = route.params;
    const [datePickerIsVisible, setDatePickerVisibility] = useState(false);

    async function onAddMeal(event, date = null) {
        setDatePickerVisibility(false);
        if (date === null) return;
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
