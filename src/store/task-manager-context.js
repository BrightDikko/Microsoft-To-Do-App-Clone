import React, { useReducer, useState } from "react";
import { getTodaysDate } from "./calendar-setup";

const TaskManagerContext = React.createContext({
    taskList: [],
    categoryList: [],
    enteredTaskText: [],
    currentTaskId: 1,
    countState: {},
    setAddingTask: () => {},
    updateTaskList: (taskDetails) => {},
    updateEnteredTaskText: (taskName) => {},
    updateCurrentTaskId: () => {},
    updateCountState: () => {},
    updateCategoryList: () => {},
});

const initialCountState = {
    my_day_count: 0,
    important_count: 0,
    planned_count: 0,
    all_count: 0,
    completed_count: 0,
    assigned_to_me_count: 0,
    flagged_email_count: 0,
    tasks_count: 0,
};

const countReducer = (state, action) => {
    switch (action.type) {
        case "all_count":
            return {
                ...state,
                all_count: action.allTasksLength,
                important_count: action.importantTasksLength,
                completed_count: action.completedTasksLength,
                my_day_count: action.myDayTasksLength,
                tasks_count: action.tasksListLength,
            };

        default:
            return state;
    }
};

export const TaskManagerContextProvider = (props) => {
    const [taskList, setTaskList] = useState([]);
    const [enteredTaskText, setEnteredTaskText] = useState("");
    const [currentTaskId, setCurrentTaskId] = useState(1);
    const [countState, dispatchCount] = useReducer(
        countReducer,
        initialCountState
    );
    const [categoryList, setCategoryList] = useState([]);

    const formattedDateToday = getTodaysDate();

    const updateCountStateHandler = (section) => {
        const allTasksLength = taskList.length;
        const myDayTasksLength = taskList.filter(
            (task) => task.date_created === formattedDateToday
        ).length;
        const importantTasksLength = taskList.filter(
            (task) => task.important === true
        ).length;
        const completedTasksLength = taskList.filter(
            (task) => task.completed === true
        ).length;
        const tasksListLength = taskList.filter(
            (task) => task.category === "Tasks"
        ).length;

        dispatchCount({
            type: section,
            allTasksLength: allTasksLength,
            myDayTasksLength: myDayTasksLength,
            importantTasksLength: importantTasksLength,
            completedTasksLength: completedTasksLength,
            tasksListLength: tasksListLength,
        });
    };

    const updateTaskListHandler = (taskDetails) => {
        setTaskList((prevList) => [taskDetails, ...prevList]);
    };

    const updateEnteredTaskTextHandler = (taskName) => {
        setEnteredTaskText(taskName);
    };
    const updateCurrentTaskId = () => {
        setCurrentTaskId((prevId) => (prevId += 1));
    };
    const updateCategoryListHandler = (newListDetails) => {
        setCategoryList((prevList) => {
            return [...prevList, newListDetails];
        });
    };

    return (
        <TaskManagerContext.Provider
            value={{
                taskList: taskList,
                categoryList: categoryList,
                enteredTaskText: enteredTaskText,
                currentTaskId: currentTaskId,
                countState: countState,
                updateTaskList: updateTaskListHandler,
                updateEnteredTaskText: updateEnteredTaskTextHandler,
                updateCurrentTaskId: updateCurrentTaskId,
                updateCountState: updateCountStateHandler,
                updateCategoryList: updateCategoryListHandler,
            }}>
            {props.children}
        </TaskManagerContext.Provider>
    );
};

export default TaskManagerContext;
