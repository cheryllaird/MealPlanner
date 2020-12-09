import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Button,
    Image,
    FlatList,
} from 'react-native';

export function RecipeDetailScreen({ navigation, route }) {
    const { recipe } = route.params;

    function onAddMeal() {
        alert("NEW MEAL")
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
            <Button title="Add to menu" onPress={onAddMeal} />
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
