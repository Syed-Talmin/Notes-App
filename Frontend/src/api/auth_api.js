import axios from "./axios";


export const userLogin = async (email, password) => {
    try {
        const response = await axios.post("/auth/login", { email, password });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const userRegister = async (name, email, password) => {
    try {
        const response = await axios.post("/auth/register", { name, email, password });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const logout = async () => {
    try {
        const response = await axios.get("/logout");
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateProfile = async (name, email) => {
  try {
    const response = await axios.put("/auth/profile/update", { name, email }); 
    return response.data;
  } catch (error) {
    throw error;
  }
};