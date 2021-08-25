const getFolderName = (folderName: string) => {
  const splittedPath = folderName.split('/');
  return splittedPath[splittedPath.length - 1];
};

export default getFolderName;
