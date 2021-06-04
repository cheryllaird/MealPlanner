import * as React from "react";
import {
    Text,
    View,
    StyleSheet,
} from "react-native";
import { Feather } from "@expo/vector-icons"; // eslint-disable-line import/no-extraneous-dependencies
import { theme } from "../theme";

const styles = StyleSheet.create({
    searchBox: {
        alignItems: "center",
        backgroundColor: theme.BACKGROUND,
        borderColor: theme.TEXT_ACCENT,
        borderRadius: 50,
        borderWidth: StyleSheet.hairlineWidth,
        flexDirection: "row",
        paddingHorizontal: 10,
        paddingVertical: 8,
        width: "100%",
    },
    searchIcon: {
        left: 10,
        position: "absolute",
    },
    searchText: {
        color: theme.TEXT_ACCENT,
        fontSize: 16,
        lineHeight: 22,
        textAlign: "center",
        width: "100%",
    },
});

// @TODO implement search
export function SearchBox(): React.ReactElement {
    return (
        <View style={styles.searchBox}>
            <Feather style={styles.searchIcon} name="search" size={18} color={theme.TEXT_ACCENT} />
            <Text style={styles.searchText}>Search recipes</Text>
        </View>
    );
}
