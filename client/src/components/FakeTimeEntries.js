import * as workOrdersAPI from "./FakeWorkOrders";

const timeEntryList = [
    {
        _id: "8c42ca3eeb7f6fbccd471815",
        
        date: "07/01/2021",
        workOrder: {
            _id: "5b21ca3eeb7f6fbccd471818",
            name: "W111111",
            desc: "xxxxxxx",
        },
        hours: 6,
    },
    {
        _id: "5b21ca3eeb7f6fbccd471815",
        date: "08/01/2021",
        workOrder: {
            _id: "5b21ca3eeb7f6fbccd471818",
            name: "W222222",
            desc: "yyyyyyy",
        },
        hours: 10,
    },
];

export function getTimeEntryList() {
    return timeEntryList;
}

export function getTimeEntry(id) {
    return timeEntryList.find((m) => m._id === id);
}

export function saveTimeEntry(timeEntry) {
    let timeEntryInDb = timeEntryList.find(m => m._id === timeEntry._id) || {};
    timeEntryInDb.date = timeEntryList.date;
    timeEntryInDb.genre = workOrdersAPI.workOrders.find(g => g._id === timeEntry.workOrderId);
    timeEntryInDb.hours = timeEntry.hours;
    if (!timeEntryInDb._id) {
        timeEntryInDb._id = Date.now();
        timeEntryList.push(timeEntryInDb);
    }
    
    return timeEntryInDb;
}

export function deleteTimeEntry(id) {
    console.log(id);
    let timeEntyrInDb = timeEntryList.find(m => m._id === id);
    timeEntryList.splice(timeEntryList.indexOf(timeEntyrInDb), 1);
    return timeEntyrInDb;
}