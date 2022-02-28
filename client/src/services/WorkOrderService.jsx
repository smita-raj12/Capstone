import http from "./httpServices";

export function getWorkOrders() {
    return http.get("/workOrder");
}

export function saveWorkOrder(workOrder){
    const body = { ...workOrder };
    delete body._id;
    return http.post("/workOrder", body);
}
