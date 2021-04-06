/* eslint-disable no-debugger, no-console */

import { useDispatch } from 'react-redux';
import { addNewProject } from '../store/slices/projectsSlice';
import { Project } from '../types';

const useProjects = () => {
  const dispatch = useDispatch();

  const createProject = (project: Project) => {
    dispatch(addNewProject(project));
  };

  return { createProject };
};

export default useProjects;
