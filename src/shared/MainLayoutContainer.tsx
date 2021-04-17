/* eslint-disable react/prop-types */
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import styled from 'styled-components';

type StyledProps = {
  readonly isSubfolderSelected: boolean;
};

type Props = {
  children: React.ReactNode;
};

const MainLayoutContainer = styled.div<StyledProps>`
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
  gap: 0px 0px;
  grid-template-areas:
    'nav main main main ${(props) =>
      props.isSubfolderSelected ? 'videolist' : 'main'}'
    'nav main main main ${(props) =>
      props.isSubfolderSelected ? 'videolist' : 'main'}'
    'nav main main main ${(props) =>
      props.isSubfolderSelected ? 'videolist' : 'main'}'
    'nav main main main ${(props) =>
      props.isSubfolderSelected ? 'videolist' : 'main'}'
    'nav main main main ${(props) =>
      props.isSubfolderSelected ? 'videolist' : 'main'}';
`;

const MainLayout: React.FC<Props> = ({ children }) => {
  const isSubfolderSelected = useSelector(
    (state: RootState) => state.projects.selectedSubFolder
  );

  return (
    <MainLayoutContainer isSubfolderSelected={Boolean(isSubfolderSelected)}>
      {children}
    </MainLayoutContainer>
  );
};

export default MainLayout;
