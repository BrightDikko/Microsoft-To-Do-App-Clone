import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useReducer, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
    Feather,
    Ionicons,
    FontAwesome5,
    MaterialCommunityIcons,
    AntDesign,
} from "@expo/vector-icons";
import CategoryButton from "../components/CategoryButton";
import HomeFooter from "../components/HomeFooter";
import TaskManagerContext from "../store/task-manager-context";
import { FlatList } from "react-native-gesture-handler";

export let hey = "hey";
export const categoryIcons = {
    my_day: <Feather name="sun" size={24} color="#73c0ca" />,
    important: <AntDesign name="staro" size={24} color="#e9b8b8" />,
    planned: <Feather name="calendar" size={24} color="#76b9c2" />,
    all: <Ionicons name="md-infinite-sharp" size={24} color="#f5e5b0" />,
    completed: <FontAwesome5 name="check-circle" size={24} color="#f5e5b0" />,
    assigned_to_me: <Feather name="user" size={24} color="white" />,
    flagged_email: <Ionicons name="flag-outline" size={24} color="#f16363" />,
    tasks: (
        <MaterialCommunityIcons
            name="home-edit-outline"
            size={24}
            color="#90b4ee"
        />
    ),
    added_lists: <Feather name="list" size={24} color="#90b4ee" />,
};

const BuildAddedList = (categoryList, navigation) => {
    let addedListNames = [];
    categoryList.forEach((item, index) => {
        //check if category is first instance
        let taskSerialNo = item.title[item.title.length - 2];
        let listName =
            taskSerialNo === "0"
                ? item.title.slice(0, item.title.length - 3)
                : item.title;
        addedListNames.push(
            <CategoryButton
                title={listName}
                icon={categoryIcons.added_lists}
                onPress={() =>
                    navigation.navigate("TaskList", { title: item.title })
                }
                key={`${item.title}${index}`}
            />
        );
    });

    // console.log(addedListNames);
    return addedListNames;
};
const HomeScreen = ({ navigation }) => {
    const ctx = useContext(TaskManagerContext);
    // console.log(ctx.categoryList);

    const showAddedList = BuildAddedList(ctx.categoryList, navigation);
    return (
        <View style={styles.container}>
            <StatusBar style="light" />

            <ScrollView style={styles.scrollContainer}>
                <CategoryButton
                    title="My Day"
                    icon={categoryIcons.my_day}
                    count={
                        ctx.countState.my_day_count === 0
                            ? null
                            : ctx.countState.my_day_count
                    }
                    onPress={() => navigation.navigate("MyDay")}
                />
                <CategoryButton
                    title="Important"
                    icon={categoryIcons.important}
                    count={
                        // CONTINUE HERE: update important count and myday count at once where necessary
                        ctx.countState.important_count === 0
                            ? null
                            : ctx.countState.important_count
                    }
                    onPress={() => navigation.navigate("Important")}
                />
                <CategoryButton
                    title="Planned"
                    icon={categoryIcons.planned}
                    onPress={() => navigation.navigate("Planned")}
                />
                <CategoryButton
                    title="All"
                    icon={categoryIcons.all}
                    count={
                        ctx.countState.all_count === 0
                            ? null
                            : ctx.countState.all_count
                    }
                    onPress={() => navigation.navigate("All")}
                />
                <CategoryButton
                    title="Completed"
                    icon={categoryIcons.completed}
                    count={
                        ctx.countState.completed_count === 0
                            ? null
                            : ctx.countState.completed_count
                    }
                    onPress={() => navigation.navigate("Completed")}
                />
                <CategoryButton
                    title="Assigned to me"
                    icon={categoryIcons.assigned_to_me}
                    onPress={() => navigation.navigate("AssignedToMe")}
                />
                <CategoryButton
                    title="Flagged email"
                    icon={categoryIcons.flagged_email}
                    onPress={() => navigation.navigate("FlaggedEmail")}
                />
                <CategoryButton
                    title="Tasks"
                    icon={categoryIcons.tasks}
                    count={
                        ctx.countState.tasks_count === 0
                            ? null
                            : ctx.countState.tasks_count
                    }
                    onPress={() => navigation.navigate("Tasks")}
                />
                <View style={styles.endLine}></View>
                {showAddedList}
            </ScrollView>

            <View>
                <HomeFooter onPress={() => navigation.navigate("NewList")} />
            </View>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000000",
    },
    scrollContainer: {
        flex: 1,
    },
    endLine: {
        height: 1,
        marginHorizontal: 20,
        marginVertical: 10,
        backgroundColor: "white",
        opacity: 0.5,
    },
});
