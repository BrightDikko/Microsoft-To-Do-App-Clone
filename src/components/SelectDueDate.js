import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import React, { useContext } from "react";
import { MaterialCommunityIcons, Octicons, Feather } from "@expo/vector-icons";
import TaskManagerContext from "../store/task-manager-context";
import { formatListName } from "../screens/TaskList";
import { datePickerSelection } from "../store/calendar-setup";

const todayWeekday = datePickerSelection().todayDateWeekday;
const tomorrowDateWeekday = datePickerSelection().tomorrowDateWeekday;
const nextWeekMondayDateWeekday =
    datePickerSelection().nextWeekMondayDateWeekday;

const formattedDateToday = datePickerSelection().formattedDateToday;
const formattedDateTomorrow = datePickerSelection().formattedDateTomorrow;
const formattedDateNextWeek = datePickerSelection().formattedDateNextWeek;

const CalendarButton = ({ icon, title, onPress }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 15,
                marginRight: 25,
                marginVertical: 10,
            }}>
            {icon}

            <Text
                style={{
                    flex: 1,
                    fontSize: 17,
                    fontFamily: "SF-Pro-Text-Regular",
                    color: "white",
                    marginLeft: 10,
                }}>
                {title}
            </Text>

            {title === "Pick a Date" ? (
                <Feather name="chevron-right" size={26} color="#ffffff" />
            ) : (
                <Text
                    style={{
                        fontSize: 17,
                        fontFamily: "SF-Pro-Text-Regular",
                        color: "lightgrey",
                        marginLeft: 10,
                    }}>
                    {title === "Today"
                        ? todayWeekday
                        : title === "Tomorrow"
                        ? tomorrowDateWeekday
                        : nextWeekMondayDateWeekday}
                </Text>
            )}
        </TouchableOpacity>
    );
};

const SelectDueDate = ({ setIsSelectingDueDate, setCustomDueDate }) => {
    const ctx = useContext(TaskManagerContext);

    const cancelHandler = () => {
        setIsSelectingDueDate(false);
    };

    const dayPressHandler = (pressedButton) => {
        if (pressedButton === "Today") {
            setCustomDueDate(formattedDateToday);
        } else if (pressedButton === "Tomorrow") {
            setCustomDueDate(formattedDateTomorrow);
        } else if (pressedButton === "Next Week") {
            setCustomDueDate(formattedDateNextWeek);
        } else {
            console.log("Show Date Picker");
        }

        cancelHandler();
    };

    return (
        <View
            style={{
                height: 300,
                width: "100%",
                backgroundColor: "#292929ff",
                borderTopStartRadius: 12,
                borderTopEndRadius: 12,
                position: "absolute",
                bottom: 0,
            }}>
            <View
                style={{
                    flexDirection: "row",
                    margin: 20,
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                <Text
                    style={{
                        flex: 6.5,
                        fontFamily: "SF-Pro-Text-Semibold",
                        fontSize: 19,
                        letterSpacing: -0.2,
                        color: "white",
                        textAlign: "center",
                        marginLeft: 20,
                    }}>
                    Due
                </Text>

                <TouchableOpacity
                    style={{
                        flex: 1,
                    }}
                    onPress={cancelHandler}>
                    <Text
                        style={{
                            fontFamily: "SF-Pro-Text-Bold",
                            fontSize: 17,
                            letterSpacing: -0.2,
                            color: "white",
                            color: "#458aeb",
                        }}>
                        Done
                    </Text>
                </TouchableOpacity>
            </View>

            <CalendarButton
                icon={<Feather name="calendar" size={24} color="#ffffff" />}
                title="Today"
                onPress={dayPressHandler.bind(this, "Today")}
            />

            <CalendarButton
                icon={
                    <MaterialCommunityIcons
                        name="calendar-arrow-right"
                        size={26}
                        color="#ffffff"
                    />
                }
                title="Tomorrow"
                onPress={dayPressHandler.bind(this, "Tomorrow")}
            />

            <CalendarButton
                icon={
                    <MaterialCommunityIcons
                        name="calendar-end"
                        size={26}
                        color="#ffffff"
                    />
                }
                title="Next Week"
                onPress={dayPressHandler.bind(this, "Next Week")}
            />

            <CalendarButton
                icon={<Feather name="calendar" size={24} color="#ffffff" />}
                title="Pick a Date"
                onPress={dayPressHandler.bind(this, "Pick a Date")}
            />
        </View>
    );
};

export default SelectDueDate;

const styles = StyleSheet.create({});
