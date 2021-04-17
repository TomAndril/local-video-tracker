/* eslint-disable react/prop-types */
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import styled from 'styled-components';
import { colors } from '../styles/Constants';

type ContainerProps = {
  isModalVisible: boolean;
};

const Container = styled.div<ContainerProps>`
  grid-area: main;
  background-color: ${colors.LIGHTGREY};
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 10px;
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${colors.BLUE};
    border-radius: 3px;
  }
  opacity: ${(props) => (props.isModalVisible ? '0.3' : '')};
  transition: opacity 200ms ease-in-out;
`;

type Props = {
  children: React.ReactNode;
};

const MainContent: React.FC<Props> = ({ children }) => {
  const isModalVisible = useSelector(
    (state: RootState) =>
      state.UI.isNewProjectModalOpen || state.UI.isRenameProjectModalOpen
  );
  return <Container isModalVisible={isModalVisible}>{children}</Container>;
};

export default MainContent;
