export const getTodaysDate = (enteredDate) => {
    const todayDate = !!enteredDate ? enteredDate : new Date();
    const todayDateWeekday = new Intl.DateTimeFormat("en-US", {
        weekday: "long",
    }).format(todayDate);
    const todayDateDayNum = new Intl.DateTimeFormat("en-US", {
        day: "numeric",
    }).format(todayDate);
    const todayDateMonth = new Intl.DateTimeFormat("en-US", {
        month: "long",
    }).format(todayDate);

    return `${todayDateWeekday}, ${todayDateMonth} ${todayDateDayNum}`;
};

export const datePickerSelection = () => {
    const todayDate = new Date();
    const tomorrowDate = new Date();
    tomorrowDate.setDate(todayDate.getDate() + 1);

    const nextWeekMondayDate = new Date();
    nextWeekMondayDate.setDate(todayDate.getDate() + 7);

    const todayDateWeekday = new Intl.DateTimeFormat("en-US", {
        weekday: "short",
    }).format(todayDate);

    const tomorrowDateWeekday = new Intl.DateTimeFormat("en-US", {
        weekday: "short",
    }).format(tomorrowDate);

    const nextWeekMondayDateWeekday = new Intl.DateTimeFormat("en-US", {
        weekday: "short",
    }).format(nextWeekMondayDate);

    return {
        todayDateWeekday: todayDateWeekday,
        tomorrowDateWeekday: tomorrowDateWeekday,
        nextWeekMondayDateWeekday: nextWeekMondayDateWeekday,
        formattedDateToday: getTodaysDate(todayDate),
        formattedDateTomorrow: getTodaysDate(tomorrowDate),
        formattedDateNextWeek: getTodaysDate(nextWeekMondayDate),
    };
};

console.log(datePickerSelection());
