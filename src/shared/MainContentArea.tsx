import styled from 'styled-components';
import { colors } from '../styles/Constants';

const MainContent = styled.div`
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
`;

export default MainContent;
