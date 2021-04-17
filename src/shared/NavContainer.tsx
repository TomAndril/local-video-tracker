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
  grid-area: nav;
  background-color: ${colors.WHITE};
  height: 100%;
  border-right: 1px solid lightgray;
  opacity: ${(props) => (props.isModalVisible ? '0.3' : '')};
  transition: opacity 200ms ease-in-out;
`;

type Props = {
  children: React.ReactNode;
};

const Nav: React.FC<Props> = ({ children }) => {
  const isModalVisible = useSelector(
    (state: RootState) =>
      state.UI.isNewProjectModalOpen || state.UI.isRenameProjectModalOpen
  );
  return <Container isModalVisible={isModalVisible}>{children}</Container>;
};

export default Nav;
