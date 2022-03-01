import http from "./httpServices";

export function getWorkOrders() {
    return http.get("/workOrder");
}

export function saveWorkOrder(workOrder,id){
    console.log(workOrder)
    if (!workOrder.id === 0) {
        const body = { ...workOrder };
        delete body._id;
        return http.put(`/workOrder/${id}`, body);
    }else {
        const body = { ...workOrder };
        delete body._id;
        return http.post("/workOrder", body);
    }
}

export function deleteWorkOrder(workOrderId) {
    console.log(workOrderId)
    return http.delete(`/workOrder/${workOrderId}`);
}