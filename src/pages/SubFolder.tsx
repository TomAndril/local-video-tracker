/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { IoMdReturnLeft } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../store';
import { setSelectedSubFolder } from '../store/slices/projectsSlice';
import VideoPlayer from '../components/VideoPlayer';
import SidePlaylist from '../components/SidePlaylist';
import Video from '../components/Video';

const Container = styled.div`
  padding: 15px;
  margin-left: 4.5%;
  scroll-behavior: smooth;
  margin-top: 5%;
`;

const GoBack = styled.div`
  padding: 14px;
  position: fixed;
  top: 0;
  width: 57.5%;
  display: flex;
  align-items: center;
  background-color: transparent;
`;

const SubFolder = () => {
  const dispatch = useDispatch();
  const subFolder = useSelector(
    (state: RootState) => state.projects.selectedSubFolder
  );

  return (
    <>
      <SidePlaylist />
      <GoBack>
        <IoMdReturnLeft
          size={24}
          style={{ cursor: 'pointer' }}
          onClick={() => dispatch(setSelectedSubFolder(null))}
        />
      </GoBack>
      <Container>
        {subFolder?.videos.map((elem) => (
          <Video key={elem.id} {...elem}>
            <VideoPlayer elem={elem} />
          </Video>
        ))}
      </Container>
    </>
  );
};

export default SubFolder;
