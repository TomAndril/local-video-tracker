export type Project = {
  id: string;
  title: string;
  rootFolder: {
    absolutePath: string;
    folders: {
      files: string[];
      subFolders: SubFolder[];
    };
  };
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
