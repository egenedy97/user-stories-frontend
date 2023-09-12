import axios from "axios";
import { getAuthHeader } from "./config";
import { localhost } from "../constants";

const baseURL = `${localhost}/users`;

const getAllUsers = async (page, limit) => {
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

const userServices = { getAllUsers };

export default userServices;
