import http from "./httpServices";

export function getWorkOrders() {
    return http.get("/workOrder");
}

export function saveWorkOrder(workOrder){
    const body = { ...workOrder };
    delete body._id;
    return http.put("/workOrder", body);
}

export function deleteWorkOrder(workOrderId) {
    console.log(workOrderId)
    return http.delete(`/workOrder/${workOrderId}`);
}