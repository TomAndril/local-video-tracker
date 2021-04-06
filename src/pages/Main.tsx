/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-debugger, no-console */
import React from 'react';
import { useSelector } from 'react-redux';
import Nav from '../components/Nav';
import NewProjectModal from '../components/NewProjectModal';

import MainContentArea from '../shared/MainContentArea';
import MainLayoutContainer from '../shared/MainLayoutContainer';
import NavContainer from '../shared/NavContainer';
import { RootState } from '../store';
import NoProjects from './NoProjects';
import Project from './Project';
import SubFolder from './SubFolder';

const Main: React.FC = () => {
  const selectedProjectId = useSelector(
    (state: RootState) => state.projects.selectedProjectId
  );
  const selectedSubFolder = useSelector(
    (state: RootState) => state.projects.selectedSubFolder
  );

  return (
    <>
      <MainLayoutContainer>
        <NavContainer>
          <Nav />
        </NavContainer>
        <MainContentArea>
          {/* IF THERE IS NO PROJECTS SHOW WELCOME SCREEN, IF THERE IS NO SELECTED SUBFOLDER SHOW PROJECT SCREEN, ELSE SHOW SUBFOLDER SCREEN */}
          {!selectedProjectId ? (
            <NoProjects />
          ) : !selectedSubFolder ? (
            <Project />
          ) : (
            <SubFolder />
          )}
        </MainContentArea>
        <NewProjectModal />
      </MainLayoutContainer>
    </>
  );
};

export default Main;
