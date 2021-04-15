export type Project = {
  id: string;
  title: string;
  rootFolder: RootFolder;
};

export type SubFolder = {
  folderName: string;
  videos: Video[];
  id: string;
};

export type Video = {
  name: string;
  completed: boolean;
  id: string;
};

export type RootFolder = {
  absolutePath: string;
  folders: {
    files: string[];
    subFolders: SubFolder[];
  };
};
