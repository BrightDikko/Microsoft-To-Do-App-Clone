import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import HomeScreenNavigator from "./src/navigation/HomeScreenNavigator";
import LoadFonts from "./src/components/LoadFonts";
import { Asset } from "expo-asset";
import React, { useEffect, useState } from "react";
import { TaskManagerContextProvider } from "./src/store/task-manager-context";

function useImages(images) {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        Asset.loadAsync(images).then(() => setLoaded(true));
    }, []);
    return [loaded];
}

export default function App() {
    const [imagesLoaded] = useImages([require("./assets/images/nature2.jpg")]);

    if (!imagesLoaded) {
        return null;
    }

    return (
        <LoadFonts>
            <NavigationContainer>
                <TaskManagerContextProvider>
                    <HomeScreenNavigator />
                </TaskManagerContextProvider>
            </NavigationContainer>
        </LoadFonts>
    );
}
