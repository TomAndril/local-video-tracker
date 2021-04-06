import React from 'react';
import styled from 'styled-components';
import { colors } from '../styles/Constants';

const StyledButton = styled.button`
  background-color: ${colors.ELEMENTS.BUTTON};
  color: ${colors.TEXT.BUTTON_TEXT};
  padding: 15px 30px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border: none;
  transition: 200ms ease-in-out;
  outline: none;
  cursor: pointer;

  :hover {
    box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.75);
  }

  :active {
    outline: none;
    border: none;
  }
`;

type Props = {
  handleClick: () => void;
};

// eslint-disable-next-line react/prop-types
const FirstProjectButton: React.FC<Props> = ({ handleClick }) => {
  return <StyledButton onClick={handleClick}>Create Project</StyledButton>;
};

export default FirstProjectButton;
