const accounts = [
    { id: 999, name: "Small business account", status: "active" , type:"small-business"},
    { id: 888, name: "Partner Test account", status: "deactivated", type:"partner" }
];

const db = {
    accounts,
};

export { db as default };