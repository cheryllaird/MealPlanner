import * as React from "react";
import {
    Text,
    View,
    StyleSheet,
    Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather, Ionicons } from "@expo/vector-icons"; // eslint-disable-line import/no-extraneous-dependencies
import { theme } from "../theme";

const styles = StyleSheet.create({
    conversation: {
        color: theme.TEXT_CONTRAST,
        fontSize: 16,
        fontWeight: "bold",
    },
    header: {
        padding: 15,
        paddingBottom: 10,
        backgroundColor: theme.BACKGROUND_CONTRAST,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
    },
});

// @TODO implement add recipe
export function RecipesHeader(): React.ReactElement {
    const navigation = useNavigation();

    function navigateToPage() {
        navigation.navigate("Add Recipe");
    }

    return (
        <View style={styles.header}>
            <Feather name="menu" size={24} color="white" />
            <Text style={styles.conversation}>Recipes</Text>
            <Pressable onPress={navigateToPage}>
                <View>
                    <Ionicons name="add-circle-outline" size={28} color="white" />
                </View>
            </Pressable>
        </View>
    );
}
