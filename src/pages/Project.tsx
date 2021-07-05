/* eslint-disable react/require-default-props */
/* eslint-disable import/first */
/* eslint-disable import/order */
/* eslint-disable no-console */
/* eslint-disable promise/always-return */
/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable radix */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-props-no-spreading */

import React, { useEffect, useState } from 'react';
import { Dialog } from 'electron';
import { RootState } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { IoTrashOutline } from 'react-icons/io5';
import { RiDragDropFill } from 'react-icons/ri';
import { BiRename } from 'react-icons/bi';
// DRAG AND DROP RELATED

import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap,
} from 'react-grid-dnd';
import ProgressBar from '@ramonak/react-progress-bar';

const { showMessageBox }: Dialog = require('electron').remote.dialog;

import Folder from '../components/Folder';

import { colors } from '../styles/Constants';
import {
  deleteProject,
  reorganizeProjectFolders,
} from '../store/slices/projectsSlice';
import { handleOpenRenameProjectModal } from '../store/slices/UISlice';
import VideoPlayer from '../components/VideoPlayer';

const Container = styled.div`
  padding: 2.5%;
`;

const Title = styled.p`
  color: ${colors.BLACK};
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
`;

const RootVideosContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 15px 0;
`;

const RootVideosDataContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 5px 0;
`;

type Props = {
  hasRootVideos?: boolean;
};

const Project = ({ hasRootVideos }: Props) => {
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

  const rootTotalVideos = project?.rootFolder.folders.videos.length;
  const rootTotalViewed = project?.rootFolder.folders.videos
    .filter((elem) => elem.completed)
    .flat().length;

  const [percentageViewed, setPercentageViewed] = useState(0);

  function calculatePercentage() {
    if (!hasRootVideos) {
      if (totalViewed && totalVideos) {
        return parseInt(((totalViewed * 100) / totalVideos).toFixed(2));
      }
    } else if (rootTotalVideos && rootTotalViewed) {
      return parseInt(((rootTotalViewed * 100) / rootTotalVideos).toFixed(2));
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

  const handleRenameProject = () => {
    if (project) {
      dispatch(handleOpenRenameProjectModal(true));
    }
  };

  const dropZoneHeightCalculator = () => {
    return (
      project && `${(project?.rootFolder.folders.subFolders.length / 5) * 18}vw`
    );
  };

  function handleDelete() {
    if (project) {
      showMessageBox({
        type: 'question',
        buttons: ['Cancel', 'Yes, Delete This Project'],
        message: `Delete ${project.title}`,
        detail:
          'Are you sure you want to delete this project? This action is not reversible',
        title: 'Local Video Tracker',
      })
        .then((res) => {
          if (res.response === 1) {
            dispatch(deleteProject(project.id));
          }
        })
        .catch((err) => console.error(err));
    }
  }

  return (
    <Container>
      <HeaderContainer>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Title>{project?.title}</Title>
        </div>
        <div
          style={{
            width: `${hasRootVideos ? '10%' : '15%'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingRight: 10,
          }}
        >
          <BiRename
            size="1.5em"
            style={{
              cursor: 'pointer',
              color: 'black',
            }}
            onClick={handleRenameProject}
          />
          {!hasRootVideos ? (
            <RiDragDropFill
              size="1.5em"
              style={{
                cursor: 'pointer',
                color: isDragEnabled ? colors.BLUE : colors.BLACK,
              }}
              onClick={() => setIsDragEnabled((val) => !val)}
            />
          ) : null}
          <IoTrashOutline
            size="1.5em"
            style={{ cursor: 'pointer' }}
            onClick={handleDelete}
          />
        </div>
      </HeaderContainer>
      <ProgressBarContainer>
        <ProgressBar
          completed={percentageViewed}
          padding="5px"
          width="73.5vw"
          labelColor={colors.BLACK}
          labelAlignment="left"
          bgColor={colors.BLUE}
        />
      </ProgressBarContainer>
      {!hasRootVideos ? (
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
      ) : (
        project?.rootFolder.folders.videos.map((elem) => (
          <RootVideosContainer key={elem.id}>
            <div>
              <RootVideosDataContainer>
                <p>{elem.name}</p>
                {elem.completed ? 'Completed' : 'Not Completed'}
              </RootVideosDataContainer>
              <VideoPlayer elem={elem} isRootFolder />
            </div>
          </RootVideosContainer>
        ))
      )}
    </Container>
  );
};

export default Project;
