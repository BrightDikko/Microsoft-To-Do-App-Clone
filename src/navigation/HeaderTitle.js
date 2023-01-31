import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";

const HeaderTitle = () => {
    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <View style={styles.headerContainer}>
                <View style={styles.headerLeftContainer}>
                    <View style={styles.headerLeftIcon}>
                        <Text style={styles.headerLeftIconText}>AP</Text>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                        }}>
                        <Text style={styles.headerLeftTitle}>
                            Andre Peters Anderson
                        </Text>
                        {/* <Text
                            style={[
                                styles.headerLeftTitle,
                                {
                                    fontSize: 18,
                                    color: "white",
                                },
                            ]}>
                            {" (apeters@gmail.com)"}
                        </Text> */}
                    </View>
                </View>

                <View style={styles.headerRightContainer}>
                    <Feather name="search" size={24} color="white" />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default HeaderTitle;

const styles = StyleSheet.create({
    safeAreaContainer: {
        backgroundColor: "black",
    },

    headerContainer: {
        flexDirection: "row",
        backgroundColor: "black",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
        paddingHorizontal: 15,
        marginTop: 20,
    },

    headerLeftContainer: {
        flexDirection: "row",
        alignItems: "center",
    },

    headerLeftIcon: {
        marginRight: 10,
        backgroundColor: "#4548aa",
        padding: 5,
        height: 35,
        width: 35,
        borderRadius: "50%",
        justifyContent: "center",
        alignItems: "center",
    },

    headerLeftIconText: {
        color: "white",
        fontFamily: "SF-Pro-Text-Regular",
        fontSize: 16,
    },

    headerLeftTitle: {
        color: "white",
        fontFamily: "SF-Pro-Text-Bold",
        letterSpacing: -0.5,
        fontSize: 20,
    },

    headerRightContainer: {
        alignItems: "flex-end",
        paddingRight: 5,
    },
});
