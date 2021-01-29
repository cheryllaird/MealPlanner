import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Button,
    Image,
    FlatList,
    Modal,
} from 'react-native';
import { firebase } from '../firebase/config';
import DateTimePicker from '@react-native-community/datetimepicker';
import { addToMealPlan } from "../api/api";
import { STORAGE_KEYS, USER_ID } from "../consts";

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
                <Text style={styles.serves}>{recipe.serves} people</Text>
                <Text style={styles.time}>{recipe.totalTime} minutes</Text>

                <FlatList
                    data={recipe.ingredients}
                    ListHeaderComponent={() => <Text style={styles.listHeader}>Ingredients</Text>}
                    renderItem={({ item }) => <Text>{item.qty}{item.measurement === "item" ? "x" : item.measurement} {item.title}</Text>}
                    keyExtractor={item => item.title}
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
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width: "100%",
        height: 100,
    },
    content: {
        padding: 5,
        flex: 1,
    },
    title: {
        fontSize: 20,
        marginBottom: 5,
    },
    serves: {
        opacity: 0.7,
    },
    time: {
        opacity: 0.7,
    },
    listHeader: {
        marginTop: 15,
        marginBottom: 5,
        fontWeight: "bold"
    },
});
