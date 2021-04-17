/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { colors } from '../styles/Constants';
import { Video as VideoType } from '../types';

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const VideoTitle = styled.p`
  color: ${colors.BLACK};
  width: 84.5%;
  margin-bottom: 10px;
  font-weight: bold;
  font-size: 1.125em;
`;

const Video: React.FC<VideoType> = ({ id, name, children }) => {
  return (
    <Container id={id}>
      <VideoTitle>{name}</VideoTitle>
      {children}
    </Container>
  );
};

export default Video;
