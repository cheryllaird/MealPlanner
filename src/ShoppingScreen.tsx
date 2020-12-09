import * as React from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';

export function ShoppingScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Coming soon</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    }
});
