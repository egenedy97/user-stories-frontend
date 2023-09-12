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
    if (!response?.tasks) {
      throw new Error("failed to fetch tasks");
    }
  } catch (error) {
    message.error("failed to fetch tasks");
    throw new Error(error.message);
  }
};

export const createTask = (projectId, taskData) => async (dispatch) => {
  try {
    const response = await taskServices.createTask(projectId, taskData);
    if (!response.task) {
      throw new Error("failed to create task");
    }
    dispatch(addTask(response?.task));
    await message.success("Task Created Successful");
  } catch (error) {
    message.error("failed to create project");

    throw new Error(error.message);
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

export const { setTasks, addTask, updateTaskSuccess, setTotal } =
  taskSlice.actions;

export default taskSlice.reducer;
