import http from "./httpServices";

export function getWorkOrders() {
    return http.get("/workOrder");
}

export function saveWorkOrder(workOrder,id){
    if (!timeEntry.formType.startsWith("New")) {
        const body = { ...workOrder };
        delete body._id;
        return http.put(`/workOrder/${id}`, body);
    }
}

export function deleteWorkOrder(workOrderId) {
    console.log(workOrderId)
    return http.delete(`/workOrder/${workOrderId}`);
}