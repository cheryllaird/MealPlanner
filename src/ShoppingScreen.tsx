import React from "react";
import {
    StyleSheet,
    View,
    Text,
    Image,
} from "react-native";

const styles = StyleSheet.create({
    image: {
        height: 250,
        maxWidth: "100%",
        width: 250,
    },
    placeholder: {
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
    placeholderText: {
        color: "grey",
        fontSize: 16,
        marginBottom: 40,
    },
});

export function ShoppingScreen(): React.ReactElement {
    return (
        <View style={styles.placeholder}>
            <Image
                style={styles.image}
                source={require("../assets/shopping.png")}
            />
            <Text style={styles.placeholderText}>Just running to the shops...</Text>
        </View>
    );
}
