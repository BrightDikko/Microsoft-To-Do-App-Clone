import {
    StyleSheet,
    Text,
    View,
    Pressable,
    TouchableOpacity,
} from "react-native";
import React from "react";
import { Octicons, AntDesign, Feather } from "@expo/vector-icons";

const TaskEntry = ({
    title,
    id,
    important,
    importantStatusChange,
    completed,
    completedStatusChange,
    hideCategoryText,
    categoryText,
    categoryIcon,
}) => {
    const updateImportantStatusHandler = () => {
        importantStatusChange(id);
    };
    const updateCompletedStatusHandler = () => {
        completedStatusChange(id);
    };
    return (
        <Pressable
            style={[
                styles.taskEntriesContainer,
                { paddingVertical: hideCategoryText ? 17 : 11 },
            ]}>
            <View style={styles.leftTaskEntry}>
                <TouchableOpacity onPress={updateCompletedStatusHandler}>
                    {completed ? (
                        <Octicons
                            name="check-circle-fill"
                            size={24}
                            color="#a09d9d"
                        />
                    ) : (
                        <Octicons name="circle" size={24} color="#a09d9d" />
                    )}
                </TouchableOpacity>
                <View style={styles.taskEntryTextContainer}>
                    <Text style={styles.taskEntryText}>{title}</Text>
                    {hideCategoryText === false && (
                        <View style={styles.categoryContainer}>
                            <View
                                style={{
                                    transform: [{ scale: 0.5 }],
                                }}>
                                {categoryIcon}
                            </View>
                            <Text style={styles.taskEntryCategoryText}>
                                {categoryText}
                            </Text>
                        </View>
                    )}
                </View>
            </View>
            <TouchableOpacity onPress={updateImportantStatusHandler}>
                {important ? (
                    <AntDesign name="star" size={24} color="#b38d8d" />
                ) : (
                    <AntDesign name="staro" size={24} color="#b38d8d" />
                )}
            </TouchableOpacity>
        </Pressable>
    );
};

export default TaskEntry;

const styles = StyleSheet.create({
    taskEntriesContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#242424e4",
        paddingHorizontal: 18,
        marginHorizontal: 15,
        borderRadius: 13,
        marginTop: 5,
        height: 60,
    },

    leftTaskEntry: {
        flexDirection: "row",
        alignItems: "center",
        width: "95%",
    },
    taskEntryTextContainer: {
        marginLeft: 15,
    },
    taskEntryText: {
        color: "white",
        fontFamily: "SF-Pro-Text-Regular",
        fontSize: 18,
    },
    categoryContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        right: 5,
    },
    taskEntryCategoryText: {
        color: "#a09d9d",
        fontFamily: "SF-Pro-Text-Regular",
        fontSize: 15,
        marginLeft: 5,
    },
});
