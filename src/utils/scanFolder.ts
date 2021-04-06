import path from 'path';
import { readdirSync } from 'fs';
import { v4 as uuid } from 'uuid';
import { SubFolder } from '../types';

export default function scanFolder(baseFolder: string) {
  const finalArray = {
    subFolders: [],
    videos: [],
    files: [],
  };
  readdirSync(baseFolder, { withFileTypes: true }).forEach((base) => {
    if (base.isFile()) {
      finalArray.files.push(base.name);
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
