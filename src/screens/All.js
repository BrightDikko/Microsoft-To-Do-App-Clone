import {
    FlatList,
    ImageBackground,
    Keyboard,
    KeyboardAvoidingView,
    Modal,
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
import { SafeAreaProvider } from "react-native-safe-area-context";
import TaskEntry from "../components/TaskEntry";
import TaskManagerContext from "../store/task-manager-context";
import { useKeyboard } from "@react-native-community/hooks";
import { getTodaysDate } from "../store/calendar-setup";
import { categoryIcons } from "./HomeScreen";
import AddNewTaskInput from "../components/AddNewTaskInput";
import SelectDueDate from "../components/SelectDueDate";
import SelectList from "../components/SelectList";
import { formatListName } from "./TaskList";

const formattedDateToday = getTodaysDate();

const All = ({ navigation }) => {
    const ctx = useContext(TaskManagerContext);
    const [addingTask, setAddingTask] = useState(false);
    const [refresh, setRefresh] = useState(0);
    const [showCategory, setShowCategory] = useState(true);
    const [isSelectingList, setIsSelectingList] = useState(false);
    const [isSelectingDueDate, setIsSelectingDueDate] = useState(false);
    const [customCategory, setCustomCategory] = useState("");
    const [customDueDate, setCustomDueDate] = useState();
    const [addedToMyDay, setAddedToMyDay] = useState(false);

    const CloseNewTaskPanel = () => {
        ctx.updateEnteredTaskText("");

        if (!!ctx.enteredTaskText.trim()) {
            ctx.updateTaskList({
                id: ctx.currentTaskId,
                title: ctx.enteredTaskText,
                notes: "",
                completed: false,
                important: false,
                date_created: addedToMyDay ? formattedDateToday : null,
                date_due: customDueDate,
                category: customCategory ? customCategory : "Tasks",
            });

            ctx.updateCurrentTaskId((prevId) => prevId + 1);
        }

        setAddingTask(false);
        setCustomCategory("");
        setCustomDueDate(null);
        setAddedToMyDay(false);

        Keyboard.dismiss();
    };

    const OpenNewTaskPanel = () => {
        setAddingTask(true);
    };

    const categoryVisibilityHandler = () => {
        setShowCategory((prevValue) => !prevValue);
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

    const goBackHandler = () => {
        ctx.updateCountState("all_count");
        navigation.goBack();
    };
    console.log(ctx.categoryList);
    return (
        <ImageBackground
            // source={require("../../assets/images/nature2.jpg")}
            resizeMode="cover"
            style={styles.backgroundImage}
            imageStyle={styles.overlay}>
            <SafeAreaView style={styles.safeAreaContainer}>
                <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
                    <View style={styles.innerMainContainer}>
                        <View style={styles.optionsContainer}>
                            <TouchableOpacity
                                style={styles.backButtonContainer}
                                activeOpacity={0.6}
                                onPress={goBackHandler}>
                                <AntDesign
                                    name="left"
                                    size={28}
                                    color="white"
                                />
                                <Text style={styles.backButtonText}>Lists</Text>
                            </TouchableOpacity>

                            {addingTask ? (
                                <View style={styles.rightButtonsContainer}>
                                    <TouchableOpacity
                                        onPress={CloseNewTaskPanel}>
                                        <Text style={styles.backButtonText}>
                                            Done
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            ) : (
                                <View style={styles.rightButtonsContainer}>
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
                                    <Text style={styles.myDayText}>All</Text>

                                    {ctx.categoryList.length === 0 && (
                                        <Pressable
                                            style={styles.categoryContainer}
                                            onPress={categoryVisibilityHandler}>
                                            {ctx.taskList.filter(
                                                (task) =>
                                                    task.category === "Tasks"
                                            ).length > 0 && (
                                                <View
                                                    style={
                                                        styles.categoryInnerContainer
                                                    }>
                                                    <AntDesign
                                                        name={
                                                            showCategory
                                                                ? "down"
                                                                : "right"
                                                        }
                                                        size={16}
                                                        color="white"
                                                    />

                                                    <Text
                                                        style={
                                                            styles.categoryText
                                                        }>
                                                        Tasks
                                                    </Text>
                                                </View>
                                            )}
                                        </Pressable>
                                    )}
                                </View>
                            }
                            data={ctx.taskList}
                            renderItem={({ item }) =>
                                showCategory && (
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
                                        categoryText={"My Day"}
                                        categoryIcon={
                                            item.date_created ===
                                            formattedDateToday
                                                ? categoryIcons.my_day
                                                : null
                                        }
                                        hideCategoryText={
                                            item.date_created ===
                                            formattedDateToday
                                                ? false
                                                : true
                                        }
                                    />
                                )
                            }
                            keyExtractor={(item) => item.id}
                        />

                        {!addingTask && (
                            <Pressable
                                style={styles.addTaskButton}
                                onPress={OpenNewTaskPanel}>
                                <AntDesign
                                    name="plus"
                                    size={24}
                                    color="white"
                                />
                                <Text style={styles.addTaskText}>
                                    Add a Task
                                </Text>
                            </Pressable>
                        )}

                        {isSelectingList && (
                            <Modal transparent={true} animationType="slide">
                                <SafeAreaProvider>
                                    <SafeAreaView
                                        style={styles.safeAreaContainer}>
                                        <SelectList
                                            setIsSelectingList={
                                                setIsSelectingList
                                            }
                                            setCustomCategory={
                                                setCustomCategory
                                            }
                                        />
                                    </SafeAreaView>
                                </SafeAreaProvider>
                            </Modal>
                        )}

                        {addingTask && (
                            <AddNewTaskInput
                                CloseNewTaskPanel={CloseNewTaskPanel}
                                iconsToShow={[
                                    "myDayIcon",
                                    "notificationsIcon",
                                    "calendarIcon",
                                    "notesIcon",
                                ]}
                                setIsSelectingList={setIsSelectingList}
                                setIsSelectingDueDate={setIsSelectingDueDate}
                                selectedCustomDueDate={customDueDate}
                                updateSelectedCustomDueDate={setCustomDueDate}
                                selectedCustomCategory={customCategory}
                                updateSelectedCustomCategory={setCustomCategory}
                                addToMyDay={addedToMyDay}
                                setIsAddedToMyDay={setAddedToMyDay}
                            />
                        )}

                        {isSelectingDueDate && (
                            <Modal transparent={true} animationType="slide">
                                <SafeAreaProvider>
                                    <SafeAreaView
                                        style={styles.safeAreaContainer}>
                                        <SelectDueDate
                                            setIsSelectingDueDate={
                                                setIsSelectingDueDate
                                            }
                                            setCustomDueDate={setCustomDueDate}
                                        />
                                    </SafeAreaView>
                                </SafeAreaProvider>
                            </Modal>
                        )}
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </ImageBackground>
    );
};

export default All;

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
    innerMainContainer: { flex: 1 },
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
    categoryContainer: {
        flexDirection: "row",
        marginTop: 10,
        marginBottom: 5,
    },
    categoryInnerContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#242424e4",
        paddingVertical: 5,
        paddingHorizontal: 8,
        borderRadius: 8,
    },
    categoryText: {
        color: "white",
        fontFamily: "SF-Pro-Text-Regular",
        fontSize: 16,
        marginLeft: 4,
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
