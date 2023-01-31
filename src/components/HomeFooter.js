import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";

const HomeFooter = ({ onPress }) => {
    const [iconOpacity, setIconOpacity] = useState(1);
    const changeIconOpacity = () => {
        setIconOpacity(0.4);
    };

    const resetIconOpacity = () => {
        setIconOpacity(1);
    };

    return (
        <Pressable
            style={styles.container}
            onPressIn={changeIconOpacity}
            onPressOut={resetIconOpacity}
            onPress={onPress}>
            <View style={styles.footerLeftContainer}>
                <View
                    style={[
                        styles.footerLeftIconContainer,
                        { opacity: iconOpacity },
                    ]}>
                    <AntDesign name="plus" size={24} color="white" />
                </View>
                <Text style={styles.footerLeftTitle}>New List</Text>
            </View>
            <View style={styles.footerRightContainer}>
                <AntDesign name="addfolder" size={24} color="white" />
            </View>
        </Pressable>
    );
};

export default HomeFooter;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginBottom: 30,
        justifyContent: "space-between",
        paddingHorizontal: 20,
        height: 50,
        alignItems: "center",
    },
    footerLeftContainer: {
        flexDirection: "row",
        marginBottom: 2,
    },
    footerLeftIconContainer: {
        marginRight: 15,
    },
    footerLeftTitle: {
        color: "white",
        fontFamily: "SF-Pro-Text-Regular",
        fontSize: 18,
        letterSpacing: -0.5,
        marginTop: 1,
    },
});
