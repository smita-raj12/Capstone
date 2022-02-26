import http from "./httpServices";

const apiEndpoint = "/timeEntry";

function timeEntryUrl(id) {
  return `${apiEndpoint}/${id}`;
}
export function getTimeEntries() {
    console.log("test",apiEndpoint)
    return http.get(apiEndpoint);
}

export function getTimeEntry(timeEntryId) {
  return http.get(timeEntryUrl(timeEntryId));
}

// export function saveTimeEntry(timeEntry) {
//   if (!timeEntry._id.startsWith("new")) {
//     const body = { ...timeEntry };
//     delete body._id;
//     delete body.week;
//     delete body.workOrderDesc;
//     return http.put(timeEntryUrl(timeEntry._id), body);
//   } else {
//     const body = { ...timeEntry };

//     console.log("timeEntry", timeEntry);
//     delete body._id;
//     delete body.week;
//     delete body.workOrderDesc;
//     return http.post(apiEndpoint, body);
//   }
// }

// export function deleteTimeEntry(timeEntryId) {
//   return http.delete(timeEntryUrl(timeEntryId));
// }