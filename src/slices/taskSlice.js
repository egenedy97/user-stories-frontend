import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import taskServices from "../services/task";

const initialState = {
  tasks: [],
  error: null,
  total: 0,
};

export const getAllTasks = (projectId, page, limit) => async (dispatch) => {
  try {
    const response = await taskServices.getAllTasks(projectId, page, limit);
    dispatch(setTasks(response?.tasks));
    dispatch(setTotal(response?.total));
  } catch (error) {
    console.error(error);
    dispatch(setError(error.message)); // Set the error in the state
  }
};

export const createTask = (projectId, taskData) => async (dispatch) => {
  try {
    const response = await taskServices.createTask(projectId, taskData);
    dispatch(addTask(response?.task));
    await message.success("Task Created Successful");
  } catch (error) {
    console.error(error);
    dispatch(setError(error.message)); // Set the error in the state
  }
};

export const getTaskById = (projectId, taskId) => async (dispatch) => {
  try {
    const response = await taskServices.getTaskById(projectId, taskId);
    dispatch(setTasks([response?.task]));
  } catch (error) {
    console.error(error);
    dispatch(setError(error.message)); // Set the error in the state
  }
};

export const updateTask =
  (projectId, taskId, updatedData) => async (dispatch) => {
    try {
      const response = await taskServices.updateTask(
        projectId,
        taskId,
        updatedData
      );
      dispatch(updateTaskSuccess(response?.task));
      await message.success("Task Updated Successfully");
    } catch (error) {
      console.error(error);
      dispatch(setError(error.message)); // Set the error in the state
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
    setTotal: (state, action) => {
      state.total = action.payload;
    },
    updateTaskSuccess: (state, action) => {
      const updatedTask = action.payload;
      const index = state.tasks.findIndex((task) => task.id === updatedTask.id);
      if (index !== -1) {
        state.tasks[index] = updatedTask;
      }
    },
  },
});

export const { setTasks, setError, addTask, updateTaskSuccess, setTotal } =
  taskSlice.actions;

export default taskSlice.reducer;
