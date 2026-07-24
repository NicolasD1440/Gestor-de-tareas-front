import api from "./api";

export const getUser = async () => {
    const response = await api.get("/user");
    return response.data;
};

export const createNewUser = async (body) => {
     const response = await api.post("/user", body);
     return response.data;
};