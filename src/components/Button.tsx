/* eslint-disable react/prop-types */
import React from 'react';

import styled from 'styled-components';
import { colors } from '../styles/Constants';

const StyledContainer = styled.div`
  background-color: ${colors.ELEMENTS.BUTTON};
  color: ${colors.TEXT.BUTTON_TEXT};
  font-weight: 600;
  padding: 10px 25px;
  border-radius: 2.5px;
  cursor: pointer;

  :active {
    outline: none;
    border: none;
  }
`;

type Props = {
  children: unknown;
  onClick: () => void;
};

const Button: React.FC<Props> = ({ children, onClick }) => {
  return <StyledContainer onClick={onClick}>{children}</StyledContainer>;
};

export default Button;
