import { createSlice } from "@reduxjs/toolkit";
import projectsService from "../services/project";
import { message } from "antd";

const initialState = {
  projects: [],
  error: null,
  total: 0,
};

export const fetchProjects = (page, limit) => async (dispatch) => {
  try {
    const response = await projectsService.getAllProjects(page, limit);
    dispatch(setProjects(response?.projects));
    dispatch(setTotal(response?.total));
  } catch (error) {
    console.error(error);
  }
};

export const createProject = (projectData) => async (dispatch) => {
  try {
    const response = await projectsService.createProject(projectData);
    dispatch(addProject(response?.project));
    await message.success("Project Created Successful");
  } catch (error) {
    console.error(error);
  }
};

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setProjects: (state, action) => {
      state.projects = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    addProject: (state, action) => {
      state.projects.push(action.payload);
    },
    setTotal: (state, action) => {
      state.total = action.payload;
    },
  },
});

export const { setProjects, setError, addProject, setTotal } =
  projectSlice.actions;

export default projectSlice.reducer;
