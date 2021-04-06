import { createGlobalStyle } from 'styled-components';

import font from '../assets/fonts/workSans/WorkSans-Regular.ttf';

const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: 'workSans';
  src: url(${font})
}
  body {
    margin: 0;
    padding: 0;
    background: #eff0f3;
    font-family: workSans;
    user-select: none;
    margin: 0;
	  vertical-align: baseline;
  }

  div {
    scroll-behavior: smooth
  }

  p, input {
    margin: 0;
    padding: 0
  }
`;

export default GlobalStyle;
