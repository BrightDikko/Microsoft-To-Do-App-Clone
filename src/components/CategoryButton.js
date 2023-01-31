import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

const CategoryButton = ({ title, icon, count, onPress }) => {
    return (
        <Pressable
            style={({ pressed }) => [
                styles.buttonContainer,
                { backgroundColor: pressed ? "#cac8c87d" : null },
            ]}
            onPress={onPress}>
            <View style={styles.buttonLeftContainer}>
                <View style={styles.iconContainer}>{icon}</View>
                <Text style={styles.buttonText}>{title}</Text>
            </View>
            <View style={styles.countContainer}>
                <Text style={styles.countText}>{count}</Text>
            </View>
        </Pressable>
    );
};

export default CategoryButton;

const styles = StyleSheet.create({
    buttonContainer: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    buttonLeftContainer: {
        flexDirection: "row",
    },

    iconContainer: {
        marginRight: 17,
    },

    buttonText: {
        color: "white",
        fontFamily: "SF-Pro-Text-Semibold",
        fontSize: 19,
        letterSpacing: -0.5,
    },

    countContainer: {},

    countText: {
        color: "white",
        fontFamily: "SF-Pro-Text-Regular",
        fontSize: 15,
    },
});
