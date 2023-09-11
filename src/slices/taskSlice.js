import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import taskServices from "../services/task";

const initialState = {
  tasks: [],
};

export const getAllTasks = (projectId, page, limit) => async (dispatch) => {
  try {
    const response = await taskServices.getAllTasks(projectId, page, limit);
    dispatch(setTasks(response?.tasks));
  } catch (error) {
    console.error(error);
  }
};

export const createTask = (projectId, taskData) => async (dispatch) => {
  try {
    const response = await taskServices.createTask(projectId, taskData);
    dispatch(addTask(response?.task));
    await message.success("Task Created Successful");
  } catch (error) {
    console.error(error);
  }
};

export const getTaskById = (projectId, taskId) => async (dispatch) => {
  try {
    const response = await taskServices.getTaskById(projectId, taskId);
    dispatch(setTasks([response?.task]));
  } catch (error) {
    console.error(error);
  }
};

export const updateTask =
  (projectId, taskId, Credential) => async (dispatch) => {
    try {
      const response = await taskServices.getTaskById(projectId, taskId);
      dispatch(setTasks([response?.task]));
    } catch (error) {
      console.error(error);
    }
  };

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
  },
});

export const { setTasks, setError, addTask } = taskSlice.actions;

export default taskSlice.reducer;
