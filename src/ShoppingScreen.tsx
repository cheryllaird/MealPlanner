import React from "react";
import {
    StyleSheet,
    View,
    Text,
    Image,
} from "react-native";

const styles = StyleSheet.create({
    image: {
        width: 250,
        height: 250,
        maxWidth: "100%",
    },
    placeholder: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    placeholderText: {
        fontSize: 16,
        color: "grey",
        marginBottom: 40,
    }
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
