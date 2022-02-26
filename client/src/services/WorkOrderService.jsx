import http from "./httpServices";

export function getWorkOrders() {
    return http.get("/workOrder");
}
