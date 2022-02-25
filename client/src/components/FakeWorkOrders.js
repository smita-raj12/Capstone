export const workOrders = [
    { _id: "5b21ca3eeb7f6fbccd471818", name: "W11111", desc: "xxxxxxx" },
    { _id: "5b21ca3eeb7f6fbccd471814", name: "W22222", desc: "yyyyyyy" },
    { _id: "5b21ca3eeb7f6fbccd471820", name: "W33333", desc: "zzzzzz" },
];

export function getWorkOrders() {
    return workOrders.filter((g) => g);
}