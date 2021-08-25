/* eslint-disable no-plusplus */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */

import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import getFolderName from '../utils/getFolderName';
import { setSelectedSubFolder } from '../store/slices/projectsSlice';
import { colors } from '../styles/Constants';
import { SubFolder } from '../types';

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width: 13vw;
  height: 13vw;
  border: 1px solid lightgray;
  border-radius: 3px;
  padding: 5px;
  box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.1);
  transition: 200ms ease-in-out;
  :hover {
    box-shadow: 0px 0px 50px 0px rgba(0, 0, 0, 0.2);
  }
`;

const VideosWatchedContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 5% 0;
  background-color: ${colors.DARKGREY};
  border-radius: 5px 5px 0 0;
  color: ${colors.WHITE};
  text-align: center;
  width: 100%;
  font-size: 0.75em;
`;

const FolderName = styled.p`
  letter-spacing: 1px;
  text-align: center;
  font-size: 0.875em;
`;

type Props = {
  element: SubFolder;
  dragEnabled: boolean;
};

const Folder: React.FC<Props> = ({ dragEnabled, element }) => {
  const dispatch = useDispatch();
  const [videosWatched, setVideosWatched] = useState(0);

  useEffect(() => {
    let counter = 0;
    element.videos.forEach((elem) => elem.completed && counter++);
    setVideosWatched(counter);
  }, [element.videos]);

  const handleClick = () => {
    if (!dragEnabled) {
      dispatch(setSelectedSubFolder(element));
    }
  };

  return (
    <Container
      style={{ cursor: dragEnabled ? 'all-scroll' : 'pointer' }}
      onClick={handleClick}
    >
      <FolderName>{getFolderName(element.folderName)}</FolderName>
      <VideosWatchedContainer>
        Viewed:{' '}
        <span style={{ fontWeight: 'bold' }}>
          {videosWatched} / {element.videos.length}
        </span>
      </VideosWatchedContainer>
    </Container>
  );
};

export default React.memo(Folder);
