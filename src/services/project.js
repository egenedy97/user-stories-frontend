import axios from "axios";
import { getAuthHeader } from "./config";
import { localhost } from "../constants";

const baseURL = `${localhost}/projects`;

const createProject = async (credentials) => {
  try {
    const response = await axios.post(
      `${baseURL}`,
      credentials,
      getAuthHeader()
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getAllProjects = async (page, limit) => {
  try {
    const response = await axios.get(`${baseURL}`, {
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

const getProjectById = async (projectId) => {
  try {
    const response = await axios.get(
      `${baseURL}/${projectId}`,
      getAuthHeader()
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const projectServices = { createProject, getAllProjects, getProjectById };

export default projectServices;
