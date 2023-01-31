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
import { getTodaysDate } from "../store/calendar-setup";

export const formatListName = (initialName) => {
    let sliceStartIndex = initialName.length - 1;
    let sliceStopIndex = initialName.length - 3;

    let proceed = true;
    while (proceed) {
        if (initialName[sliceStopIndex] === "(") {
            proceed = false;
            break;
        }
        sliceStopIndex -= 1;
    }
    return initialName.slice(0, sliceStopIndex);
};

const TaskList = ({ navigation, route }) => {
    // 👉  CONTINUE FROM HERE, FIX SCREEN BUILD AND INTEGRATE CALENDAR
    const [enteredText, setEnteredText] = useState(
        formatListName(route.params.title)
    );
    const [categoryName, setCategoryName] = useState("");

    const formattedDateToday = getTodaysDate();
    const ctx = useContext(TaskManagerContext);
    const [addingTask, setAddingTask] = useState(false);
    const [refresh, setRefresh] = useState(0);

    const currentList = ctx.categoryList.find(
        (list) => list.title === route.params.title
    );

    console.log(currentList);
    const CloseNewTaskPanel = () => {
        ctx.updateEnteredTaskText("");

        if (!!ctx.enteredTaskText) {
            ctx.updateTaskList({
                id: ctx.currentTaskId,
                title: ctx.enteredTaskText,
                notes: "",
                completed: false,
                important: false,
                date_created: formattedDateToday,
                category: currentList.originalName,
            });

            ctx.updateCurrentTaskId((prevId) => prevId + 1);
        }

        setAddingTask(false);
        Keyboard.dismiss();
    };

    const OpenNewTaskPanel = () => {
        setAddingTask(true);
    };

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

    const updateCategoryListHandler = () => {
        let formattedEnteredText = !!enteredText.trim()
            ? enteredText.trim()
            : "Untitled list";

        let newInstanceNo;

        // Check for duplicate
        let existingDuplicateList = ctx.categoryList.filter(
            (item) =>
                item.title.slice(0, item.title.length - 3) ===
                formattedEnteredText
        );
        let existingDuplicate =
            existingDuplicateList[existingDuplicateList.length - 1];

        if (existingDuplicate) {
            newInstanceNo = (
                parseInt(
                    existingDuplicate.title[existingDuplicate.title.length - 2]
                ) + 1
            ).toString();

            formattedEnteredText = `${formattedEnteredText}(${newInstanceNo})`;
        } else {
            formattedEnteredText = `${formattedEnteredText}(0)`;
        }

        setCategoryName(formattedEnteredText);

        // currentList.aliases.push(formattedEnteredText);

        // 👉 🐞 Edge Case Alert: Fix edge case for 10+ duplicates occures.
        // Idea 1, grab the entire bracket at the end of each task list title,
        // i.e. for title = Books(12), grab (12), then remove bracket
        // Idea 2, use length of existingDuplicateList, instead of slicing
        // !important: make sure to update HomeScreen.js as well (BuildAddedList function)
    };

    // console.log(ctx.categoryList);
    console.log(ctx.taskList);
    // const currentList = ctx.categoryList.find(
    //     (list) => list.title === route.params.title
    // );
    // console.log(currentList);
    const goBackHandler = () => {
        ctx.updateCountState("all_count");

        if (categoryName !== "") {
            currentList.title = categoryName;

            // ctx.updateCategoryList({
            //     title: categoryName,
            // });
        }
        navigation.goBack();
    };

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

                    {addingTask ? (
                        <View style={styles.rightButtonsContainer}>
                            <TouchableOpacity onPress={CloseNewTaskPanel}>
                                <Text style={styles.backButtonText}>Done</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View style={styles.rightButtonsContainer}>
                            <AntDesign name="adduser" size={26} color="white" />
                            <MaterialIcons
                                name="more-horiz"
                                size={30}
                                color="white"
                            />
                        </View>
                    )}
                </View>
                <FlatList
                    ListHeaderComponent={
                        <View style={styles.headerContainer}>
                            <TextInput
                                placeholder="Untitled list"
                                placeholderTextColor={"lightgray"}
                                defaultValue={route.params.title}
                                autoFocus={false}
                                onChangeText={(text) => setEnteredText(text)}
                                value={enteredText}
                                style={styles.myDayText}
                                returnKeyType="done"
                                onSubmitEditing={updateCategoryListHandler}
                            />
                        </View>
                    }
                    data={ctx.taskList.filter(
                        (item) => item.category === currentList.originalName
                    )}
                    renderItem={({ item }) => (
                        <TaskEntry
                            title={item.title}
                            id={item.id}
                            important={item.important}
                            importantStatusChange={importantStatusChangeHandler}
                            completed={item.completed}
                            completedStatusChange={completedStatusChangeHandler}
                            hideCategoryText={true}
                        />
                    )}
                    keyExtractor={(item) => item.id}
                />

                <Pressable
                    style={styles.addTaskButton}
                    onPress={OpenNewTaskPanel}>
                    <AntDesign name="plus" size={24} color="white" />
                    <Text style={styles.addTaskText}>Add a Task</Text>
                </Pressable>

                {addingTask && (
                    <View style={[styles.addNewTaskContainer, { bottom: 348 }]}>
                        <View style={styles.addTaskInputContainer}>
                            <Octicons name="circle" size={24} color="#a09d9d" />
                            <TextInput
                                placeholder="Add a Task"
                                placeholderTextColor={"#a09d9d"}
                                style={styles.addTaskInputText}
                                autoFocus={true}
                                onChangeText={(value) => {
                                    ctx.updateEnteredTaskText(value);
                                }}
                            />
                        </View>

                        <View style={styles.addNewTaskOptionsContainer}>
                            <MaterialCommunityIcons
                                name="home-edit-outline"
                                size={28}
                                color="#a09d9d"
                            />
                            <Octicons
                                name="bell"
                                size={24}
                                color="#a09d9d"
                                style={styles.notificationBellIcon}
                            />
                            <Feather
                                name="calendar"
                                size={24}
                                color="#a09d9d"
                            />
                            <MaterialCommunityIcons
                                name="note-outline"
                                size={26}
                                color="#a09d9d"
                                style={styles.stickyNotesIcon}
                            />
                        </View>
                    </View>
                )}
            </SafeAreaView>
        </ImageBackground>
    );
};

export default TaskList;

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
        fontSize: 30,
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
