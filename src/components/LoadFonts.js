import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

const LoadFonts = ({ children }) => {
    const [fontsLoaded] = useFonts({
        "SF-Pro-Text-Bold": require("../../assets/fonts/SF-Pro-Text-Bold.otf"),
        "SF-Pro-Text-Regular": require("../../assets/fonts/SF-Pro-Text-Regular.otf"),
        "SF-Pro-Text-Semibold": require("../../assets/fonts/SF-Pro-Text-Semibold.otf"),
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
            {children}
        </View>
    );
};

export default LoadFonts;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
