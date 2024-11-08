import axios from "axios";
import { toast } from "react-toastify";

export const fetchNotes = async (user) => {
  try {
    console.log(user);
    const response = await axios.post("/api/notes/get", { user });
    return response.data.data;
  } catch (error) {
    console.error(`Error occured: ${error.message}`);
  }
};

export const createNote = async (note) => {
  try {
    const response = await axios.post("/api/notes", note);
    return response.data.data;
  } catch (error) {
    console.error(`Error occured: ${error.message}`);
  }
};

export const updateNote = async (id, updatedNote) => {
  try {
    await axios.put(`/api/notes/${id}`, updatedNote);
  } catch (error) {
    console.error(`Error occured: ${error.message}`);
  }
};

export const deleteNote = async (id, setNotes) => {
  try {
    await axios.delete(`/api/notes/${id}`);
    setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
  } catch (error) {
    console.error(`Error occured: ${error.message}`);
  }
};

export const register = async (userDetials) => {
  try {
    const response = await axios.post("/api/auth/register", userDetials);
    const res = await response;
    toast.success(res.data.message, {
      autoClose: 2000,
    });
    return res.data;
  } catch (error) {
    if (error.response && error.response.data) {
      console.error(`Error occurred: ${error.response.data.message}`);
      toast.error(error.response.data.message, {
        autoClose: 3000,
      });
      return error.response.data;
    } else {
      console.error(`Error occurred: ${error.message}`);
    }
  }
};

export const login = async (userDetials) => {
  try {
    const response = await axios.post("/api/auth/login", userDetials);
    const res = await response;
    toast.success(res.data.message, {
      autoClose: 2000,
    });
    console.log(res.data);
    return res.data;
  } catch (error) {
    if (error.response && error.response.data) {
      console.error(`Error occurred: ${error.response.data.message}`);
      toast.error(error.response.data.message, {
        autoClose: 3000,
      });
      return error.response.data;
    } else {
      console.error(`Error occurred: ${error.message}`);
    }
  }
};
