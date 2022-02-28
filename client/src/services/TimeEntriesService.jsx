import http from "./httpServices";

const apiEndpoint = "/timeEntry";

function timeEntryUrl(id) {
  console.log(id)
  return `${apiEndpoint}/${id}`;
}

function timeEntryUrlMaxId() {
  return `${apiEndpoint}/max`;
}

export function getTimeEntries() {
    console.log("test",apiEndpoint)
    return http.get(apiEndpoint);
}

export function getTimeEntryMaxId() {
  console.log("test",apiEndpoint)
  return http.get(timeEntryUrlMaxId());
}

export function getTimeEntry(timeEntryId) {
  return http.get(timeEntryUrl(timeEntryId));
}

export function saveTimeEntry(timeEntry) {
  console.log("timeEntry", timeEntry);
  if (!timeEntry.formType.startsWith("New")) {
    const body = { ...timeEntry };
    delete body._id;
    delete body.formType;
    delete body.week;
    delete body.workOrderDesc;
    //delete body.hours;
    return http.put(timeEntryUrl(timeEntry._id), body);
  } else {
    const body = { ...timeEntry };

    delete body.formType;
    delete body._id;
    delete body.week;
    delete body.workOrderDesc;
    return http.post(apiEndpoint, body);
  }
  
}

export function deleteTimeEntry(timeEntryId) {
  console.log(timeEntryId)
  return http.delete(timeEntryUrl(timeEntryId));
}