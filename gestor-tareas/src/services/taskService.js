import api from "./api";

export const getTasks = async () => {
    const response = await api.get("/task");
    return response.data;
};

export const updateTask = async (id, task) => {
    const response = await api.patch(`/task/${id}`, task);
    return response.data;
};

export const createTask = async (task) =>{
    const response = await api.post(`/task`, task);
    return response.data;
}

export const deleteTask = async (id) =>{
    const response = await api.delete(`/task/${id}`);
    return response.data;
}