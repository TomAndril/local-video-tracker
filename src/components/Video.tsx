/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { Video as VideoType } from '../types';

const Container = styled.div``;

const Video: React.FC<VideoType> = ({ id, name, children }) => {
  return (
    <Container id={id}>
      <h2>{name}</h2>
      {children}
    </Container>
  );
};

export default Video;
