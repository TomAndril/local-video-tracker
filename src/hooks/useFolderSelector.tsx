/* eslint-disable consistent-return */
import { Dialog } from 'electron';
import scanFolder from '../utils/scanFolder';

const { showOpenDialog }: Dialog = require('electron').remote.dialog;

// PROCESS
// 1 - GET BASE DIRECTORY
// 2 - ON EACH SUBFOLDER, ITERATE TO GET VIDEO FILES

const useFolderSelector = () => {
  // eslint-disable-next-line consistent-return
  const openDialog = async () => {
    try {
      const prompt = await showOpenDialog({ properties: ['openDirectory'] });
      if (prompt.canceled) return;
      return {
        absolutePath: prompt.filePaths[0],
        folders: scanFolder(prompt.filePaths[0]),
      };
    } catch (error) {
      return error;
    }
  };

  return { openDialog };
};

export default useFolderSelector;
