import * as React from "react";
import {
    StyleSheet,
    View,
    Text,
} from "react-native";

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        flex: 1,
        justifyContent: "center",
        padding: 20,
    },
});

export function ShoppingScreen(): React.ReactElement {
    return (
        <View style={styles.container}>
            <Text>Coming soon</Text>
        </View>
    );
}
