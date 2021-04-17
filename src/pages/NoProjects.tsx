/* eslint-disable jsx-a11y/accessible-emoji */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

// ELECTRON RELATED
import { shell } from 'electron';

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

const Introduction = styled.p`
  font-size: 0.875em;
  width: 75%;
  margin-top: 2%;
  text-align: center;
  line-height: 27px;
  color: ${colors.BLACK};
`;

const List = styled.ul`
  width: 75%;
  margin-top: 2%;
`;

const ListElement = styled.li`
  font-size: 0.875em;
  padding-left: 20px;
  padding-top: 10px;
  color: ${colors.BLACK};
`;

const Button = styled.div`
  margin-top: 30px;
  padding: 20px 20px;
  background-color: ${colors.BLUE};
  border-radius: 5px;
  cursor: pointer;
  color: ${colors.BLUE};
  font-weight: bold;
  transition: 200ms ease-in-out;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  font-size: 0.875em;
  color: ${colors.WHITE};
  :hover {
    opacity: 0.75;
  }
`;

const Title = styled.h1`
  color: ${colors.BLACK};
  margin: 0;
`;

const PersonalInfo = styled.div`
  position: absolute;
  right: 10px;
  bottom: 5px;
  font-size: 0.875em;
  color: ${colors.BLACK};
`;

const NoProjects = () => {
  const dispatch = useDispatch();

  return (
    <Container>
      <Title>Local Video Tracker</Title>
      <Introduction>
        This tool allows you to organize your videos contained in folders to
        keep track of your progression as the videos are viewed. This tool is
        specially useful for those who:
      </Introduction>
      <List>
        <ListElement>
          Has downloaded series, courses or videos and want to know where to
          continue next.
        </ListElement>
        <ListElement>
          Wants to have a quick idea about how many videos still to be seen.
        </ListElement>
        <ListElement>Simply wants to organize their video folders.</ListElement>
      </List>
      <Button onClick={() => dispatch(handleOpenNewProjectModal(true))}>
        Create your first project
      </Button>
      <PersonalInfo>
        Made with <span role="img">💓</span> By
        <span
          onClick={() => shell.openExternal('https://tominasweb.com')}
          style={{ color: colors.BLUE, cursor: 'pointer' }}
        >
          {' '}
          Tomas Nasjleti
        </span>
      </PersonalInfo>
    </Container>
  );
};

export default NoProjects;
