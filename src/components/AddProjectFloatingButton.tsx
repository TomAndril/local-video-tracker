/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { AiOutlinePlus } from 'react-icons/ai';
import { colors } from '../styles/Constants';

const Container = styled.div`
  width: 4.5em;
  height: 4.5em;
  background-color: ${colors.ELEMENTS.NAV_BACKGROUND};
  color: ${colors.TEXT.BUTTON_TEXT};
  border-radius: 50px;
  position: absolute;
  right: 10px;
  bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 300ms ease-in-out;
  :hover {
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
  }
`;

type Props = {
  handleClick: () => void;
};

const AddProjectFloatingButton: React.FC<Props> = ({ handleClick }) => {
  return (
    <Container onClick={handleClick}>
      <AiOutlinePlus size="1.5em" />
    </Container>
  );
};

export default AddProjectFloatingButton;
