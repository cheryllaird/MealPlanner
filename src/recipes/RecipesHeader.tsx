import * as React from "react";
import {
    Text,
    View,
    StyleSheet,
} from "react-native";
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

export function RecipesHeader(): React.ReactElement {
    return (
        <View style={styles.header}>
            <Feather name="menu" size={24} color="white" />
            <Text style={styles.conversation}>Recipes</Text>
            <Ionicons name="add-circle-outline" size={28} color="white" />
        </View>
    );
}
