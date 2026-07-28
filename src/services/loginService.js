import api from "./api";

export const login = async(body)=>{
    const response = await api.post(`/auth/login`, body);
    return response.data;
}

export const logout = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};
