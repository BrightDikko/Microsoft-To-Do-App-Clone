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

const SelectList = ({ setIsSelectingList, setCustomCategory }) => {
    const ctx = useContext(TaskManagerContext);

    const cancelHandler = () => {
        setIsSelectingList(false);
    };
    const listPressHandler = (listName) => {
        setCustomCategory(listName);
        cancelHandler();
    };

    const BuildListTable = () => {
        let listTable = [];

        // listTable.push(
        // <TouchableOpacity
        //     onPress={listPressHandler.bind(this, "Tasks")}
        //     style={{
        //         flexDirection: "row",
        //         alignItems: "center",
        //         margin: 10,
        //     }}
        //     key={"DefaultTasksList01"}>
        //     <MaterialCommunityIcons
        //         name="home-edit-outline"
        //         size={28}
        //         color="#90b4ee"
        //     />
        //     <Text
        //         style={{
        //             flex: 1,
        //             fontSize: 17,
        //             fontFamily: "SF-Pro-Text-Regular",
        //             color: "white",
        //             marginLeft: 10,
        //         }}>
        //         Tasks
        //     </Text>
        // </TouchableOpacity>
        // );

        ctx.categoryList.forEach((category, index) => {
            // console.log(category);
            listTable.push(
                <TouchableOpacity
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        margin: 10,
                    }}
                    key={index}
                    onPress={listPressHandler.bind(this, category.title)}>
                    <Feather name="list" size={24} color="#90b4ee" />
                    <Text
                        style={{
                            flex: 1,
                            fontSize: 17,
                            fontFamily: "SF-Pro-Text-Regular",
                            color: "white",
                            marginLeft: 15,
                        }}>
                        {formatListName(category.title)}
                    </Text>
                </TouchableOpacity>
            );
        });
        return listTable;
    };
    const listsRenderer = BuildListTable();

    return (
        <View
            style={{
                height: "100%",
                width: "100%",
                backgroundColor: "#292929ff",
                borderTopStartRadius: 12,
                borderTopEndRadius: 12,
            }}>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    margin: 15,
                }}>
                <TouchableOpacity
                    style={{
                        flex: 1,
                    }}
                    onPress={cancelHandler}>
                    <Text
                        style={{
                            fontFamily: "SF-Pro-Text-Semibold",
                            fontSize: 17,
                            letterSpacing: -0.2,
                            color: "white",
                        }}>
                        Cancel
                    </Text>
                </TouchableOpacity>

                <Text
                    style={{
                        flex: 1.9,
                        fontFamily: "SF-Pro-Text-Semibold",
                        fontSize: 19,
                        letterSpacing: -0.2,
                        color: "white",
                    }}>
                    Select a List
                </Text>
            </View>

            <TouchableOpacity
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    margin: 10,
                }}
                onPress={cancelHandler}
                // key={"DefaultTasksList01"}
            >
                <MaterialCommunityIcons
                    name="home-edit-outline"
                    size={28}
                    color="#90b4ee"
                />
                <Text
                    style={{
                        flex: 1,
                        fontSize: 17,
                        fontFamily: "SF-Pro-Text-Regular",
                        color: "white",
                        marginLeft: 10,
                    }}>
                    Tasks
                </Text>
            </TouchableOpacity>

            {listsRenderer}
        </View>
    );
};

export default SelectList;

const styles = StyleSheet.create({});
