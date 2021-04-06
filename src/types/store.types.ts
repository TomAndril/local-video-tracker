import { Project, SubFolder } from '.';

export type UserState = {
  selectedProjectId: string | null;
};

export type ProjectsState = {
  projects: Project[];
  selectedProjectId: string | null;
  selectedSubFolder: SubFolder | null;
};
