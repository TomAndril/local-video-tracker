/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../store';
import { setSelectedProjectId } from '../store/slices/projectsSlice';
import { handleOpenNewProjectModal } from '../store/slices/UISlice';
import { colors } from '../styles/Constants';

const NewProjectButton = styled.div`
  padding: 2em 0;
  background-color: ${colors.LIGHTGREY};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${colors.BLUE};
  text-transform: uppercase;
  font-weight: bold;
  transition: 300ms ease-in-out;
  :hover {
    background-color: ${colors.GREEN};
    color: ${colors.LIGHTGREY};
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
  background-color: ${colors.LIGHTGREY};
  font-size: 0.875em;
  align-items: center;
  justify-content: center;
  color: ${colors.BLUE};
  cursor: pointer;
  border-bottom: 1px solid lightgray;
  transition: 100ms ease-in-out;
  :hover {
    background-color: lightgray;
  }
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
        {projects.length === 0 && (
          <p
            style={{
              textAlign: 'center',
              marginTop: '50%',
              color: colors.BLUE,
              fontSize: '1.125em',
              textDecoration: 'underline',
            }}
          >
            No Projects Yet
          </p>
        )}
        {projects.map((elem) => {
          return (
            <ProjectElement
              key={elem.id}
              onClick={() => dispatch(setSelectedProjectId(elem.id))}
              style={{
                backgroundColor:
                  elem.id === selectedProjectId
                    ? 'lightgray'
                    : colors.LIGHTGREY,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <p>{elem.title}</p>
                <p
                  style={{
                    backgroundColor: colors.ORANGE,
                    padding: '7px',
                    borderRadius: '3px',
                    fontWeight: 'bold',
                    fontSize: '0.75em',
                  }}
                >
                  {calculateProjectsTotalVideos(elem.id)} Videos
                </p>
              </div>
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
