/* eslint-disable react/prop-types */
import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Project } from '../types';
import { setSelectedProjectId } from '../store/slices/projectsSlice';

const Container = styled.div`
  width: 15em;
  height: 10em;
  margin: 1em;
  border-radius: 5px;
  padding: 15px;
  cursor: pointer;
  transition: 200ms ease-in-out;
  :hover {
    box-shadow: 0px 0px 13px 0px rgba(0, 0, 0, 0.4);
  }
`;

const ProjectCard: React.FC<Project> = ({ title, rootFolder, id }) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(setSelectedProjectId(id));
  };

  return (
    <Container onClick={handleClick}>
      <p>{title}</p>
      <p>
        {rootFolder.elementsInFolder.length > 1
          ? `${rootFolder.elementsInFolder.length} Folders Found`
          : 'This Folder has no subfolders'}
      </p>
    </Container>
  );
};

export default ProjectCard;
