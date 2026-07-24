import api from "./api";

export const login = async(body)=>{
    const response = await api.post(`/login`, body);
    return response.data;
}