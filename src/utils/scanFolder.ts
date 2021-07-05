import path, { basename } from 'path';
import { readdirSync } from 'fs';
import { v4 as uuid } from 'uuid';
import { SubFolder, Video } from '../types';

type FinalArray = {
  subFolders: SubFolder[];
  videos: Video[];
  files: string[];
};

export default function scanFolder(baseFolder: string) {
  const finalArray: FinalArray = {
    subFolders: [],
    videos: [],
    files: [],
  };
  readdirSync(baseFolder, { withFileTypes: true }).forEach((base) => {
    if (base.isFile()) {
      if (path.extname(base.name) === '.mp4') {
        finalArray.videos.push({
          completed: false,
          name: base.name,
          id: uuid(),
        });
      }
    }
    if (base.isDirectory()) {
      const newPath = `${baseFolder}/${base.name}`;

      const subFolderObj: SubFolder = {
        folderName: newPath,
        videos: [],
        id: uuid(),
      };

      readdirSync(newPath, { withFileTypes: true }).forEach((elem) => {
        if (elem.isFile()) {
          if (path.extname(elem.name) === '.mp4') {
            subFolderObj.videos.push({
              completed: false,
              name: elem.name,
              id: uuid(),
            });
          }
        }
      });
      finalArray.subFolders.push(subFolderObj);
    }
  });
  return finalArray;
}
