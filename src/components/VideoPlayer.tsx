/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Player from 'react-player';
import { RootState } from '../store';
import { Video } from '../types';
import {
  setRootVideoCompleted,
  setVideoCompleted,
} from '../store/slices/projectsSlice';

type Props = {
  elem: Video;
  isRootFolder?: boolean;
};

const VideoPlayer: React.FC<Props> = ({ elem, isRootFolder }) => {
  const [completed, setCompleted] = useState(false);
  const subFolder = useSelector(
    (state: RootState) => state.projects.selectedSubFolder
  );
  const selectedProjectId = useSelector(
    (state: RootState) => state.projects.selectedProjectId
  );
  const rootFolder = useSelector((state: RootState) =>
    state.projects.projects.filter((root) => root.id === selectedProjectId)
  )[0].rootFolder.absolutePath;
  const dispatch = useDispatch();

  const handleVideoCompletion = (item: Video) => {
    if (completed) return;
    setCompleted(true);
    if (!isRootFolder) {
      dispatch(setVideoCompleted(item));
    } else {
      dispatch(setRootVideoCompleted(item));
    }
  };

  if (isRootFolder) {
    return (
      <Player
        controls
        url={`${rootFolder}/${elem.name}`}
        onProgress={(state) => {
          if (state.played > 0.95) {
            handleVideoCompletion(elem);
          }
        }}
      />
    );
  }

  return (
    <Player
      controls
      url={`${subFolder?.folderName}/${elem.name}`}
      onProgress={(state) => {
        if (state.played > 0.95) {
          handleVideoCompletion(elem);
        }
      }}
    />
  );
};

export default VideoPlayer;
