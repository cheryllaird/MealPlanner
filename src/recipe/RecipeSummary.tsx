import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Button,
    Image,
    SectionList,
    SafeAreaView,
    Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export function RecipeSummary({ recipe }) {
    const navigation = useNavigation();

    function navigateToPage() {
         navigation.navigate('Recipe Detail', { recipe })
    }

    return (
        <Pressable onPress={navigateToPage}>
            <View style={styles.container}>
                <Image
                    style={styles.image}
                    source={{ uri: recipe.img }}
                />
                <View style={styles.summary}>
                    <Text style={styles.title}>{recipe.title}</Text>
                    <Text style={styles.time}>{recipe.totalTime} minutes</Text>
                </View>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor: "white",
        borderColor: "grey",
        borderWidth: StyleSheet.hairlineWidth,
        padding: 5,
    },
    image: {
        width: "40%",
        height: 70,
        marginRight: 10,
        borderRadius: 5,
    },
    summary: {
        flexDirection: "column",
        flex: 1,
    },
    title: {
        fontSize: 16,
        marginBottom: 5,
    },
    time: {
        opacity: 0.7,
    }
});
