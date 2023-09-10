import axios from "axios";
import { localhost } from "../constants";

const baseURL = `${localhost}/auth`;

const register = async (credentials) => {
  const response = await axios.post(`${baseURL}/signup`, credentials);
  return response.data;
};

const login = async (credentials) => {
  const response = await axios.post(`${baseURL}/login`, credentials);
  return response.data;
};

const authService = { register, login };
export default authService;
