/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { IoTrashOutline } from 'react-icons/io5';
import { RootState } from '../store';
import { colors } from '../styles/Constants';
import { deleteProject } from '../store/slices/projectsSlice';
import Folder from '../components/Folder';

const Container = styled.div`
  padding: 2.5%;
`;

const Title = styled.p`
  color: ${colors.BLUE};
  font-size: 3em;
  font-weight: bold;
  letter-spacing: 1.5px;
  margin: 5% 0;
`;

const FoldersContainer = styled.div`
  margin: 0 auto;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CounterBadge = styled.p`
  padding: 10px 30px;
  background-color: ${colors.BLUE};
  margin-left: 10px;
  border-radius: 3px;
  color: ${colors.LIGHTGREY};
  font-size: 0.75em;
`;

const Project = () => {
  const dispatch = useDispatch();
  const project = useSelector((state: RootState) =>
    state.projects.projects.find(
      (proj) => proj.id === state.projects.selectedProjectId
    )
  );

  const totalVideos = project?.rootFolder.folders.subFolders.reduce(
    (total, current) => {
      return total + current.videos.length;
    },
    0
  );

  const totalViewed = project?.rootFolder.folders.subFolders
    .map((elem) => elem.videos.filter((video) => video.completed && video))
    .flat().length;

  return (
    <Container>
      <HeaderContainer>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Title>{project?.title}</Title>
          <CounterBadge>
            Completed {totalViewed} of {totalVideos} Videos
          </CounterBadge>
        </div>
        <IoTrashOutline
          size="1.5em"
          style={{ cursor: 'pointer' }}
          onClick={() => project && dispatch(deleteProject(project.id))}
        />
      </HeaderContainer>
      <FoldersContainer>
        {project?.rootFolder.folders.subFolders.map((elem) => (
          <Folder {...elem} key={elem.id} />
        ))}
      </FoldersContainer>
    </Container>
  );
};

export default Project;
