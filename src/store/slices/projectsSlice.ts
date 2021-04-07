/* eslint-disable prefer-destructuring */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Project, SubFolder, Video } from '../../types';
import { ProjectsState } from '../../types/store.types';

type OrganizedFolders = {
  project: Project;
  newFolders: SubFolder[];
};

const initialState: ProjectsState = {
  projects: JSON.parse(localStorage.getItem('projects')!) || [],
  selectedProjectId:
    JSON.parse(localStorage.getItem('selectedProjectId')!) || null,
  selectedSubFolder: null,
};

const projectsSlice = createSlice({
  name: 'PROJECTS',
  initialState,
  reducers: {
    addNewProject: (state, action: PayloadAction<Project>) => {
      const withoutEmptyFolders: Project = {
        id: action.payload.id,
        title: action.payload.title,
        rootFolder: {
          absolutePath: action.payload.rootFolder.absolutePath,
          folders: {
            files: action.payload.rootFolder.folders.files,
            subFolders: action.payload.rootFolder.folders.subFolders.filter(
              (elem) => elem.videos.length > 0
            ),
          },
        },
      };
      if (JSON.parse(localStorage.getItem('projects')!)) {
        const newStorage = [...state.projects, withoutEmptyFolders];
        localStorage.setItem('projects', JSON.stringify(newStorage));
      } else {
        localStorage.setItem('projects', JSON.stringify([withoutEmptyFolders]));
      }
      state.projects.push(withoutEmptyFolders);
    },
    setSelectedProjectId: (state, action: PayloadAction<string | null>) => {
      state.selectedProjectId = action.payload;
      state.selectedSubFolder = null;
      localStorage.setItem('selectedProjectId', JSON.stringify(action.payload));
    },
    deleteProject: (state, action: PayloadAction<string>) => {
      const projects = JSON.parse(localStorage.getItem('projects')!);
      const newStorage = projects.filter(
        (elem: Project) => elem.id !== action.payload
      );
      localStorage.setItem('projects', JSON.stringify(newStorage));
      state.projects = newStorage;
      if (state.projects.length > 0) {
        state.selectedProjectId = state.projects[state.projects.length - 1].id;
      } else {
        state.selectedProjectId = null;
        localStorage.removeItem('selectedProjectId');
      }
    },
    setSelectedSubFolder: (state, action: PayloadAction<SubFolder | null>) => {
      state.selectedSubFolder = action.payload;
    },
    setVideoCompleted: (state, action: PayloadAction<Video>) => {
      const storage: Project[] = JSON.parse(localStorage.getItem('projects')!);
      const updatedProjects = storage.map((proj) => {
        if (proj.id === state.selectedProjectId) {
          proj.rootFolder.folders.subFolders.map((subf) =>
            subf.videos.map((video) => {
              if (video.id === action.payload.id) {
                video.completed = true;
              }
              return video;
            })
          );
        }
        return proj;
      });

      const newSelectedSubFolder = storage
        .filter((elem) => elem.id === state.selectedProjectId)
        .map((elem) =>
          elem.rootFolder.folders.subFolders.filter(
            (subf) => subf.id === state.selectedSubFolder?.id
          )
        );

      const subFolderToUpdate = newSelectedSubFolder[0][0].videos.map(
        (elem) => {
          if (elem.id === action.payload.id) {
            elem.completed = true;
          }
          return elem;
        }
      );

      const composedSubFolder: SubFolder = {
        folderName: newSelectedSubFolder[0][0].folderName,
        id: newSelectedSubFolder[0][0].id,
        videos: subFolderToUpdate,
      };

      state.projects = updatedProjects;
      state.selectedSubFolder = composedSubFolder;
      localStorage.setItem('projects', JSON.stringify(updatedProjects));
    },
    reorganizeProjectFolders: (
      state,
      action: PayloadAction<OrganizedFolders>
    ) => {
      const { newFolders, project } = action.payload;
      const indexToReplace = state.projects.findIndex(
        (elem) => elem.id === project.id
      );
      state.projects[indexToReplace].rootFolder.folders.subFolders = newFolders;
      const storedProjects: Project[] = JSON.parse(
        localStorage.getItem('projects')!
      );
      storedProjects[indexToReplace].rootFolder.folders.subFolders = newFolders;
      localStorage.setItem('projects', JSON.stringify(storedProjects));
    },
  },
});

export default projectsSlice.reducer;

export const {
  addNewProject,
  setSelectedProjectId,
  deleteProject,
  setSelectedSubFolder,
  setVideoCompleted,
  reorganizeProjectFolders,
} = projectsSlice.actions;
