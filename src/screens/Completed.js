import {
    FlatList,
    ImageBackground,
    Keyboard,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import {
    AntDesign,
    MaterialCommunityIcons,
    MaterialIcons,
    Octicons,
    Feather,
} from "@expo/vector-icons";
import TaskEntry from "../components/TaskEntry";
import TaskManagerContext from "../store/task-manager-context";
import { useKeyboard } from "@react-native-community/hooks";

const Completed = ({ navigation }) => {
    const ctx = useContext(TaskManagerContext);
    const [refresh, setRefresh] = useState(0);

    const importantStatusChangeHandler = (itemId) => {
        const taskDetails = ctx.taskList[ctx.taskList.length - itemId];
        taskDetails.important = !taskDetails.important;
        setRefresh(refresh === 0 ? 1 : 0);
    };

    const completedStatusChangeHandler = (itemId) => {
        const taskDetails = ctx.taskList[ctx.taskList.length - itemId];
        taskDetails.completed = !taskDetails.completed;
        setRefresh(refresh === 0 ? 1 : 0);
    };

    const goBackHandler = () => {
        ctx.updateCountState("all_count");
        navigation.goBack();
    };

    const completedTasks = ctx.taskList.filter((task) => {
        return task.completed === true;
    });

    return (
        <ImageBackground
            // source={require("../../assets/images/nature2.jpg")}
            resizeMode="cover"
            style={styles.backgroundImage}
            imageStyle={styles.overlay}>
            <SafeAreaView style={styles.safeAreaContainer}>
                <View style={styles.optionsContainer}>
                    <TouchableOpacity
                        style={styles.backButtonContainer}
                        activeOpacity={0.6}
                        onPress={goBackHandler}>
                        <AntDesign name="left" size={28} color="white" />
                        <Text style={styles.backButtonText}>Lists</Text>
                    </TouchableOpacity>

                    <View style={styles.rightButtonsContainer}>
                        <MaterialIcons
                            name="more-horiz"
                            size={30}
                            color="white"
                        />
                    </View>
                </View>
                <FlatList
                    ListHeaderComponent={
                        <View style={styles.headerContainer}>
                            <Text style={styles.myDayText}>Completed</Text>
                        </View>
                    }
                    data={completedTasks}
                    renderItem={({ item }) => {
                        return (
                            <TaskEntry
                                title={item.title}
                                id={item.id}
                                important={item.important}
                                importantStatusChange={
                                    importantStatusChangeHandler
                                }
                                completed={item.completed}
                                completedStatusChange={
                                    completedStatusChangeHandler
                                }
                            />
                        );
                    }}
                    keyExtractor={(item) => item.id}
                />
            </SafeAreaView>
        </ImageBackground>
    );
};

export default Completed;

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        backgroundColor: "black",
    },
    overlay: {
        flex: 1,
        opacity: 0.65,
    },
    safeAreaContainer: { flex: 1, backgroundColor: "transparent" },
    optionsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginLeft: 8,
        marginRight: 15,
        height: 50,
    },
    backButtonContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    backButtonText: {
        color: "white",
        fontFamily: "SF-Pro-Text-Semibold",
        fontSize: 20,
    },

    rightButtonsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    scrollViewContainer: { flex: 1 },

    headerContainer: {
        marginHorizontal: 20,
    },

    myDayText: {
        color: "white",
        fontFamily: "SF-Pro-Text-Bold",
        fontSize: 40,
    },

    calendarText: {
        color: "white",
        fontFamily: "SF-Pro-Text-Semibold",
        fontSize: 20,
        marginLeft: 2,
    },

    addTaskButton: {
        flexDirection: "row",
        backgroundColor: "#242424e4",
        padding: 20,
        marginHorizontal: 15,
        borderRadius: 13,
        marginBottom: 15,
    },

    addTaskText: {
        color: "#ffffff",
        fontFamily: "SF-Pro-Text-Regular",
        fontSize: 18,
        marginLeft: 15,
        marginTop: 1,
    },

    addNewTaskContainer: {
        height: 105,
        width: "100%",
        backgroundColor: "#242424e4",
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        position: "absolute",
    },
    addTaskInputContainer: {
        flexDirection: "row",
        marginHorizontal: 30,
        marginTop: 20,
        marginBottom: 15,
    },
    addTaskInputText: {
        color: "#ffffff",
        marginLeft: 20,
        fontFamily: "SF-Pro-Text-Regular",
        fontSize: 18,
    },
    addNewTaskOptionsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginRight: "55%",
        marginLeft: 30,
    },
    notificationBellIcon: { marginTop: 3 },
    stickyNotesIcon: {
        transform: [{ rotate: "90deg" }],
    },
});
