import {
    KeyboardAvoidingViewComponent,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
    Text,
    Pressable,
    ScrollView,
    TouchableWithoutFeedback,
} from "react-native";
import React, { useContext, useState } from "react";
import TaskManagerContext from "../store/task-manager-context";

import {
    MaterialIcons,
    MaterialCommunityIcons,
    Octicons,
    Feather,
} from "@expo/vector-icons";
import { datePickerSelection } from "../store/calendar-setup";
import { formatListName } from "../screens/TaskList";

const formattedDateToday = datePickerSelection().formattedDateToday;
const formattedDateTomorrow = datePickerSelection().formattedDateTomorrow;
const formattedDateNextWeek = datePickerSelection().formattedDateNextWeek;

const AddNewTaskInput = ({
    CloseNewTaskPanel,
    iconsToShow,
    setIsSelectingList,
    setIsSelectingDueDate,
    selectedCustomDueDate,
    updateSelectedCustomDueDate,
    updateSelectedCustomCategory,
    selectedCustomCategory,
    addToMyDay,
    setIsAddedToMyDay,
}) => {
    const ctx = useContext(TaskManagerContext);

    console.log(selectedCustomDueDate);
    const optionsIcons = {
        taskListIcon: (
            <MaterialCommunityIcons
                name="home-edit-outline"
                size={28}
                color="#a09d9d"
            />
        ),
        myDayIcon: <Feather name="sun" size={24} color="#a09d9d" />,
        notificationsIcon: (
            <Octicons
                name="bell"
                size={24}
                color="#a09d9d"
                style={styles.notificationBellIcon}
            />
        ),
        calendarIcon: <Feather name="calendar" size={24} color="#a09d9d" />,
        notesIcon: (
            <MaterialCommunityIcons
                name="note-outline"
                size={26}
                color="#a09d9d"
                style={styles.stickyNotesIcon}
            />
        ),
    };

    const iconPressHandler = (iconName) => {
        if (iconName === "taskListIcon") {
            setIsSelectingList(true);
        } else if (iconName === "taskListIconCancelButton") {
            updateSelectedCustomCategory("");
        } else if (iconName === "calendarIcon") {
            setIsSelectingDueDate(true);
        } else if (iconName === "calendarIconCancelButton") {
            updateSelectedCustomDueDate(null);
        } else if (iconName === "myDayIcon") {
            setIsAddedToMyDay(true);
        } else if (iconName === "myDayIconCancelButton") {
            setIsAddedToMyDay(false);
        }
    };

    const BuildIconsTable = (iconsToShow, optionsIcons) => {
        let iconsTable = [];

        iconsToShow.forEach((iconName, index) => {
            let dateDue = null;

            if (selectedCustomDueDate === formattedDateToday) {
                dateDue = "Due Today";
            } else if (selectedCustomDueDate === formattedDateTomorrow) {
                dateDue = "Due Tomorrow";
            } else if (selectedCustomDueDate === formattedDateNextWeek) {
                dateDue = "Due Next Week";
            }

            iconsTable.push(
                iconName === "calendarIcon" &&
                    selectedCustomDueDate &&
                    dateDue ? (
                    <TouchableOpacity
                        key={index}
                        // onPress={iconPressHandler.bind(this, iconName)}
                        style={styles.miniIconContainer}>
                        <Feather name="calendar" size={24} color="black" />
                        <Text style={styles.miniIconTextContainer}>
                            {dateDue}
                        </Text>
                        <Pressable
                            onPress={iconPressHandler.bind(
                                this,
                                "calendarIconCancelButton"
                            )}>
                            <MaterialIcons
                                name="cancel"
                                size={19}
                                color="black"
                            />
                        </Pressable>
                    </TouchableOpacity>
                ) : iconName === "taskListIcon" && selectedCustomCategory ? (
                    <TouchableOpacity
                        key={index}
                        // onPress={iconPressHandler.bind(this, iconName)}
                        style={styles.miniIconContainer}>
                        <Feather name="list" size={19} color="black" />
                        <Text style={styles.miniIconTextContainer}>
                            {formatListName(selectedCustomCategory)}
                        </Text>
                        <Pressable
                            onPress={iconPressHandler.bind(
                                this,
                                "taskListIconCancelButton"
                            )}>
                            <MaterialIcons
                                name="cancel"
                                size={19}
                                color="black"
                            />
                        </Pressable>
                    </TouchableOpacity>
                ) : iconName === "myDayIcon" && addToMyDay ? (
                    <TouchableOpacity
                        key={index}
                        // onPress={iconPressHandler.bind(this, iconName)}
                        style={styles.miniIconContainer}>
                        <Feather name="sun" size={19} color="black" />
                        <Text style={styles.miniIconTextContainer}>
                            Add to My Day
                        </Text>
                        <Pressable
                            onPress={iconPressHandler.bind(
                                this,
                                "myDayIconCancelButton"
                            )}>
                            <MaterialIcons
                                name="cancel"
                                size={19}
                                color="black"
                            />
                        </Pressable>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        key={index}
                        onPress={iconPressHandler.bind(this, iconName)}
                        style={{
                            flexDirection: "row",
                            marginRight: 10,
                        }}>
                        {optionsIcons[iconName]}
                    </TouchableOpacity>
                )
            );
        });
        return iconsTable;
    };

    const iconRenderer = BuildIconsTable(iconsToShow, optionsIcons);

    return (
        <View style={[styles.addNewTaskContainer]}>
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
                    onSubmitEditing={CloseNewTaskPanel}
                />
            </View>

            <ScrollView
                horizontal={true}
                alwaysBounceHorizontal={false}
                keyboardShouldPersistTaps="handled"
                showsHorizontalScrollIndicator={false}>
                <View style={styles.addNewTaskOptionsContainer}>
                    {iconRenderer}
                </View>
            </ScrollView>
        </View>
    );
};

export default AddNewTaskInput;

const styles = StyleSheet.create({
    addNewTaskContainer: {
        height: 115,
        width: "100%",
        backgroundColor: "#242424e4",
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
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
        marginHorizontal: 30,
        alignItems: "center",
    },
    notificationBellIcon: { marginTop: 3 },
    stickyNotesIcon: {
        transform: [{ rotate: "90deg" }],
    },
    miniIconContainer: {
        flexDirection: "row",
        backgroundColor: "lightblue",
        alignItems: "center",
        marginRight: 10,
        borderRadius: "50%",
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    miniIconTextContainer: {
        color: "black",
        marginHorizontal: 7,
        fontFamily: "SF-Pro-Text-Regular",
        fontSize: 16,
    },
});
