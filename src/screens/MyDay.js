<script src="http://10.31.48.247:8097"></script>;
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
    Feather,
} from "@expo/vector-icons";
import TaskEntry from "../components/TaskEntry";
import TaskManagerContext from "../store/task-manager-context";
import { useKeyboard } from "@react-native-community/hooks";
import { getTodaysDate } from "../store/calendar-setup";
import AddNewTaskInput from "../components/AddNewTaskInput";
import SelectList from "../components/SelectList";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import { formatListName } from "./TaskList";
import SelectDueDate from "../components/SelectDueDate";

const formattedDateToday = getTodaysDate();

const MyDay = ({ navigation }) => {
    const ctx = useContext(TaskManagerContext);
    const [addingTask, setAddingTask] = useState(false);
    const [refresh, setRefresh] = useState(0);
    const [isSelectingList, setIsSelectingList] = useState(false);
    const [isSelectingDueDate, setIsSelectingDueDate] = useState(false);
    const [customCategory, setCustomCategory] = useState("");
    const [customDueDate, setCustomDueDate] = useState();

    const CloseNewTaskPanel = () => {
        ctx.updateEnteredTaskText("");

        if (!!ctx.enteredTaskText.trim()) {
            ctx.updateTaskList({
                id: ctx.currentTaskId,
                title: ctx.enteredTaskText,
                notes: "",
                completed: false,
                important: false,
                date_created: formattedDateToday,
                date_due: customDueDate,
                category: customCategory ? customCategory : "Tasks",
            });

            ctx.updateCurrentTaskId((prevId) => prevId + 1);
        }

        setAddingTask(false);
        setCustomCategory("");
        setCustomDueDate(null);

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

    const goBackHandler = () => {
        ctx.updateCountState("all_count");
        navigation.goBack();
    };

    // console.log(ctx.taskList);
    // console.log("custom category: ", customCategory);

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
                                    <MaterialCommunityIcons
                                        name="lightbulb-on-outline"
                                        size={30}
                                        color="white"
                                    />
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
                                    <Text style={styles.myDayText}>My Day</Text>
                                    <Text style={styles.calendarText}>
                                        {formattedDateToday}
                                    </Text>
                                </View>
                            }
                            data={ctx.taskList.filter(
                                (item) =>
                                    item.date_created === formattedDateToday
                            )}
                            renderItem={({ item }) => (
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
                                    hideCategoryText={false}
                                    categoryText={
                                        item.category === "Tasks"
                                            ? "Tasks"
                                            : formatListName(item.category)
                                    }
                                />
                            )}
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
                                    "taskListIcon",
                                    "notificationsIcon",
                                    "calendarIcon",
                                    "notesIcon",
                                ]}
                                setIsSelectingList={setIsSelectingList}
                                setIsSelectingDueDate={setIsSelectingDueDate}
                                updateSelectedCustomDueDate={setCustomDueDate}
                                selectedCustomDueDate={customDueDate}
                                updateSelectedCustomCategory={setCustomCategory}
                                selectedCustomCategory={customCategory}
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

export default MyDay;

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

    calendarText: {
        color: "white",
        fontFamily: "SF-Pro-Text-Semibold",
        fontSize: 20,
        marginLeft: 2,
    },

    addTaskButton: {
        flexDirection: "row",
        backgroundColor: "#242424ee",
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

    notificationBellIcon: { marginTop: 3 },
    stickyNotesIcon: {
        transform: [{ rotate: "90deg" }],
    },
});
