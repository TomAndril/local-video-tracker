/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Player from 'react-player';
import { RootState } from '../store';
import { Video } from '../types';
import { setVideoCompleted } from '../store/slices/projectsSlice';

type Props = {
  elem: Video;
};

const VideoPlayer: React.FC<Props> = ({ elem }) => {
  const [completed, setCompleted] = useState(false);
  const subFolder = useSelector(
    (state: RootState) => state.projects.selectedSubFolder
  );
  const dispatch = useDispatch();

  const handleVideoCompletion = (item: Video) => {
    if (completed) return;
    setCompleted(true);
    dispatch(setVideoCompleted(item));
  };

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
