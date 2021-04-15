import { RootFolder } from 'types';

export default function folderContainsVideos(folder: RootFolder): boolean {
  return folder.folders.subFolders.some((elem) => elem.videos.length > 0);
}
