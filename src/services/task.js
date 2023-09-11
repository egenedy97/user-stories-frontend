import axios from "axios";
import { getAuthHeader } from "./config";
import { localhost } from "../constants";

const baseURL = `${localhost}/projects`;

const createTask = async (projectId, credentials) => {
  try {
    const response = await axios.post(
      `${baseURL}/${projectId}/tasks`,
      credentials,
      getAuthHeader()
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getAllTasks = async (projectId, page, limit) => {
  try {
    const response = await axios.get(`${baseURL}/${projectId}/tasks`, {
      ...getAuthHeader(),
      params: {
        page,
        limit,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getTaskById = async (projectId, taskId) => {
  try {
    const response = await axios.get(
      `${baseURL}/${projectId}/tasks/${taskId}`,
      {
        ...getAuthHeader(),
      }
    );
    return response.data;
  } catch (e) {
    throw e;
  }
};

const updateTask = async (projectId, taskId, credentials) => {
  try {
    const response = await axios.put(
      `${baseURL}/${projectId}/tasks/${taskId}`,
      credentials,
      {
        ...getAuthHeader(),
      }
    );
    return response.data;
  } catch (e) {
    throw e;
  }
};

const taskServices = { createTask, getAllTasks, getTaskById, updateTask };

export default taskServices;
