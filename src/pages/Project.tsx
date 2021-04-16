/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable radix */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { IoTrashOutline } from 'react-icons/io5';
import { RiDragDropFill } from 'react-icons/ri';
import ProgressBar from '@ramonak/react-progress-bar';

// DRAG AND DROP RELATED
import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap,
} from 'react-grid-dnd';

import { RootState } from '../store';
import { colors } from '../styles/Constants';
import {
  deleteProject,
  reorganizeProjectFolders,
} from '../store/slices/projectsSlice';

import Folder from '../components/Folder';

const Container = styled.div`
  padding: 2.5%;
`;

const Title = styled.p`
  color: ${colors.BLUE};
  font-size: 3em;
  font-weight: bold;
  letter-spacing: 1.5px;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ProgressBarContainer = styled.div`
  margin: 2% 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Project = () => {
  const dispatch = useDispatch();
  const project = useSelector((state: RootState) =>
    state.projects.projects.find(
      (proj) => proj.id === state.projects.selectedProjectId
    )
  );

  const [isDragEnabled, setIsDragEnabled] = useState(false);

  const totalVideos = project?.rootFolder.folders.subFolders.reduce(
    (total, current) => {
      return total + current.videos.length;
    },
    0
  );

  const totalViewed = project?.rootFolder.folders.subFolders
    .map((elem) => elem.videos.filter((video) => video.completed && video))
    .flat().length;

  const [percentageViewed, setPercentageViewed] = useState(0);

  function calculatePercentage() {
    if (totalViewed && totalVideos) {
      return parseInt(((totalViewed * 100) / totalVideos).toFixed(2));
    }
    return 0;
  }

  useEffect(() => {
    setPercentageViewed(calculatePercentage());
  }, [project]);

  function handleGridChange(
    _sourceId: any,
    sourceIndex: number,
    targetIndex: number,
    _targetId: any
  ) {
    if (project) {
      const result = swap(
        project?.rootFolder.folders.subFolders,
        sourceIndex,
        targetIndex
      );
      dispatch(reorganizeProjectFolders({ newFolders: result, project }));
    }
  }

  const dropZoneHeightCalculator = () => {
    return (
      project && `${(project?.rootFolder.folders.subFolders.length / 5) * 18}vw`
    );
  };

  return (
    <Container>
      <HeaderContainer>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Title>{project?.title}</Title>
        </div>
        <div
          style={{
            width: '10%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingRight: 10,
          }}
        >
          <RiDragDropFill
            size="1.5em"
            style={{
              cursor: 'pointer',
              color: isDragEnabled ? colors.GREEN : 'black',
            }}
            onClick={() => setIsDragEnabled((val) => !val)}
          />
          <IoTrashOutline
            size="1.5em"
            style={{ cursor: 'pointer' }}
            onClick={() => project && dispatch(deleteProject(project.id))}
          />
        </div>
      </HeaderContainer>
      <ProgressBarContainer>
        <ProgressBar
          completed={percentageViewed}
          bgColor={
            percentageViewed <= 33
              ? colors.RED
              : percentageViewed > 33 && percentageViewed <= 66
              ? colors.YELLOW
              : colors.GREEN
          }
          padding="5px"
          width="74vw"
          labelColor="black"
          labelAlignment="center"
        />
      </ProgressBarContainer>
      <GridContextProvider onChange={handleGridChange}>
        <GridDropZone
          disableDrag={!isDragEnabled}
          boxesPerRow={5}
          id="folders"
          rowHeight={190}
          style={{
            height: dropZoneHeightCalculator(),
          }}
        >
          {project?.rootFolder.folders.subFolders.map((elem) => (
            <GridItem key={elem.id}>
              <Folder element={elem} dragEnabled={isDragEnabled} />
            </GridItem>
          ))}
        </GridDropZone>
      </GridContextProvider>
    </Container>
  );
};

export default Project;
