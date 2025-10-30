import axios from "./axios";

export const getNotes = async () => {
  try {
    const response = await axios.get("/notes");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createNote = async (data) => {
  try {
    const response = await axios.post("/notes/create", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateNote = async (id, data) => {
  try {
    const response = await axios.put(`/notes/update/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteNote = async (id) => {
  try {
    const response = await axios.delete(`/notes/delete/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCategories = async () => {
  try {
    const response = await axios.get("/notes/categories");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const summarizeNote = async (data) => {
  try {
    const response = await axios.post("/notes/summarize", {
      notes: data.notes,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
