import api from "./api";

export const getUser = async () => {
    const response = await api.get("/user");
    return response.data;
};

export const getUserLogged = async () => {
    const response = await api.get("/auth/me");
    return response.data.user;
};

export const getUserById = async (id) => {
    const response = await api.get(`/user/${id}`);
    return response.data;
};

export const createNewUser = async (body) => {
     const response = await api.post("/user", body);
     return response.data;
};

export const updateUser = async (id, body) => {
     const response = await api.patch(`/user/${id}`, body);
     return response.data;
};