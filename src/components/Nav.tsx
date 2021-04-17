/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../store';
import { setSelectedProjectId } from '../store/slices/projectsSlice';
import { handleOpenNewProjectModal } from '../store/slices/UISlice';
import { colors } from '../styles/Constants';

const NewProjectButton = styled.div`
  padding: 2em 0;
  background-color: ${colors.BLUE};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${colors.WHITE};
  text-transform: uppercase;
  font-weight: bold;
  transition: opacity 300ms ease-in-out;
  :hover {
    opacity: 0.75;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: space-between;
`;

const ProjectElement = styled.div`
  padding: 1.125em 10px;
  background-color: ${colors.WHITE};
  font-size: 0.875em;
  align-items: center;
  justify-content: center;
  color: ${colors.BLUE};
  cursor: pointer;
  border-bottom: 1px solid lightgray;
  transition: 100ms ease-in-out;
`;

const NoProjects = styled.div`
  text-align: center;
  margin-top: 50%;
  color: ${colors.BLACK};
  font-size: 1em;
`;

const ProjectWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ProjectBadge = styled.div`
  background-color: ${colors.BLUE};
  color: ${colors.WHITE};
  padding: 7px;
  border-radius: 2px;
  font-weight: bold;
  font-size: 0.75em;
`;

const ProjectsContainer = styled.div`
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 10px;
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${colors.BLUE};
    border-radius: 3px;
  }
`;

const ProjectTitle = styled.p`
  color: ${colors.BLACK};
  font-size: 1em;
`;

const Nav = () => {
  const dispatch = useDispatch();
  const projects = useSelector((state: RootState) => state.projects.projects);
  const selectedProjectId = useSelector(
    (state: RootState) => state.projects.selectedProjectId
  );

  const calculateProjectsTotalVideos = (id: string) => {
    const project = projects.filter((elem) => elem.id === id);
    return project[0]?.rootFolder.folders.subFolders
      .flat()
      .reduce((acc, curr) => {
        return (acc += curr.videos.length);
      }, 0);
  };

  return (
    <Container>
      <ProjectsContainer>
        {projects.length === 0 && <NoProjects>No Projects Yet</NoProjects>}
        {projects.map((elem) => {
          return (
            <ProjectElement
              key={elem.id}
              onClick={() => dispatch(setSelectedProjectId(elem.id))}
              style={{
                backgroundColor:
                  elem.id === selectedProjectId
                    ? colors.GREY
                    : colors.LIGHTGREY,
              }}
            >
              <ProjectWrapper>
                <ProjectTitle>{elem.title}</ProjectTitle>
                <ProjectBadge>
                  {calculateProjectsTotalVideos(elem.id)} Videos
                </ProjectBadge>
              </ProjectWrapper>
            </ProjectElement>
          );
        })}
      </ProjectsContainer>
      <NewProjectButton
        onClick={() => dispatch(handleOpenNewProjectModal(true))}
      >
        New Project
      </NewProjectButton>
    </Container>
  );
};

export default Nav;
