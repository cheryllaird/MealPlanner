import React from "react";
import {
    StyleSheet,
    View,
    Text,
    Button,
    Image,
    ImageSourcePropType,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { theme } from "../theme";

const styles = StyleSheet.create({
    image: {
        height: 250,
        maxWidth: "100%",
        width: 250,
    },
    message: {
        color: theme.TEXT_ACCENT,
        fontSize: 16,
        marginBottom: 40,
    },
    placeholder: {
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
});

interface Props {
    image?: ImageSourcePropType;
    message: string;
    cta?: {
        text: string;
        route: string;
    };
}

export function Placeholder({ image, message, cta }: Props): React.ReactElement {
    const navigation = useNavigation();
    return (
        <View style={styles.placeholder}>
            {image && (
                <Image style={styles.image} source={image} />
            )}

            <Text style={styles.message}>{message}</Text>

            {cta && (
                <Button title={cta.text} onPress={() => navigation.navigate(cta.route)} />
            )}
        </View>
    );
}
