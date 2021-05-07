import React from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Recipe } from "../interfaces/Recipes";

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFFFFF",
        borderColor: "#E0E0E0",
        borderWidth: StyleSheet.hairlineWidth,
        flexDirection: "row",
        padding: 5,
    },
    image: {
        borderRadius: 5,
        height: 70,
        marginRight: 10,
        width: "40%",
    },
    summary: {
        flexDirection: "column",
        flex: 1,
    },
    time: {
        opacity: 0.7,
    },
    title: {
        fontSize: 16,
        marginBottom: 5,
    },
});

export function RecipeSummary({ recipe }: { recipe: Recipe }): React.ReactElement {
    const navigation = useNavigation();

    function navigateToPage() {
        navigation.navigate("Recipe Detail", { recipe });
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
                    <Text style={styles.time}>
                        {recipe.totalTime}
                        {" "}
                        minutes
                    </Text>
                </View>
            </View>
        </Pressable>
    );
}
