import styled from 'styled-components';

const MainLayoutContainer = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
  gap: 0px 0px;
  grid-template-areas:
    'nav main main main main'
    'nav main main main main'
    'nav main main main main'
    'nav main main main main'
    'nav main main main main';
`;

export default MainLayoutContainer;
