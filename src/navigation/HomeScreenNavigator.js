import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HeaderTitle from "./HeaderTitle";

import {
    HomeScreen,
    Important,
    MyDay,
    Planned,
    All,
    Completed,
    AssignedToMe,
    FlaggedEmail,
    Tasks,
    NewList,
    TaskList,
} from "../screens/screens";

const Stack = createNativeStackNavigator();

const HomeScreenNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="LandingScreen"
                component={HomeScreen}
                options={() => ({
                    headerTitle: "",
                    header: () => {
                        return <HeaderTitle />;
                    },
                })}
            />
            <Stack.Screen
                name="MyDay"
                component={MyDay}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Important"
                component={Important}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Planned"
                component={Planned}
                // options={{ headerShown: false }}
            />
            <Stack.Screen
                name="All"
                component={All}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Completed"
                component={Completed}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="AssignedToMe"
                component={AssignedToMe}
                // options={{ headerShown: false }}
            />
            <Stack.Screen
                name="FlaggedEmail"
                component={FlaggedEmail}
                // options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Tasks"
                component={Tasks}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="NewList"
                component={NewList}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="TaskList"
                component={TaskList}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
};

export default HomeScreenNavigator;
