import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { handleOpenNewProjectModal } from '../store/slices/UISlice';
import { colors } from '../styles/Constants';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin: 0;
  flex-direction: column;
`;

const Button = styled.div`
  margin-top: 30px;
  padding: 20px 20px;
  background-color: ${colors.YELLOW};
  border-radius: 5px;
  cursor: pointer;
  color: ${colors.BLUE};
  font-weight: bold;
  transition: 200ms ease-in-out;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  font-size: 0.875em;

  :hover {
    background-color: ${colors.ORANGE};
  }
`;

const Title = styled.h1`
  color: ${colors.BLUE};
  margin: 0;
`;

const NoProjects = () => {
  const dispatch = useDispatch();
  return (
    <Container>
      <Title>Welcome!</Title>
      <p style={{ width: '70%', textAlign: 'center' }}>
        This tools lets you follow your local projects, you dont have any
        projects created yet, start by creating one
      </p>
      <Button onClick={() => dispatch(handleOpenNewProjectModal(true))}>
        Create your first project
      </Button>
    </Container>
  );
};

export default NoProjects;
