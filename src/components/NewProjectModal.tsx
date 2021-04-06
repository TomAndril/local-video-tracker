/* eslint-disable promise/always-return */
import React, { useState } from 'react';
import styled from 'styled-components';
import { RiCloseFill } from 'react-icons/ri';
import { v4 as uuid } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { colors } from '../styles/Constants';
import useProjects from '../hooks/useProjects';
import useFolderSelector from '../hooks/useFolderSelector';
import { RootState } from '../store';
import { handleOpenNewProjectModal } from '../store/slices/UISlice';
import { setSelectedProjectId } from '../store/slices/projectsSlice';

const StyledContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  padding: 3%;
`;

const Title = styled.p`
  color: ${colors.BLUE};
  font-weight: bold;
  letter-spacing: 0.125em;
  text-transform: uppercase;
`;

const Input = styled.input`
  height: 50px;
  width: 95%;
  border-radius: 5px;
  border: 0;
  margin: 30px 0;
  outline: none;
  ::placeholder {
    color: ${colors.BLUE};
    font-weight: bold;
  }
  padding-left: 5%;
  background-color: ${colors.LIGHTGREY};
`;

const CloseBar = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  align-items: center;
  justify-content: flex-end;
  display: flex;
`;

const SelectFolderButton = styled.div`
  background-color: ${colors.YELLOW};
  cursor: pointer;
  border-radius: 5px;
  color: ${colors.BLUE};
  font-weight: bold;
  text-transform: uppercase;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NewProjectModal: React.FC = () => {
  const [inputVal, setInputVal] = useState('');
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  const isOpen = useSelector(
    (state: RootState) => state.UI.isNewProjectModalOpen
  );

  // CUSTOM HOOKS
  const { openDialog } = useFolderSelector();
  const { createProject } = useProjects();

  const handleClick = () => {
    if (inputVal.length <= 0) {
      return setError(true);
    }
    openDialog()
      .then((res) => {
        if (res) {
          const id = uuid();
          setInputVal('');
          setError(false);
          createProject({ title: inputVal, rootFolder: res, id });
          dispatch(setSelectedProjectId(id));
          dispatch(handleOpenNewProjectModal(false));
        }
      })
      .catch((err) => err);
  };

  if (!isOpen) return null;

  return (
    <StyledContainer>
      <Card>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'space-around',
          }}
        >
          <Title>Create A New Project</Title>
          <CloseBar>
            <RiCloseFill
              color={colors.BLUE}
              style={{ cursor: 'pointer' }}
              size="2em"
              onClick={() => dispatch(handleOpenNewProjectModal(false))}
            />
          </CloseBar>
          <Input
            type="text"
            placeholder={error ? 'Type a name' : 'Project Name'}
            value={inputVal}
            autoFocus
            onChange={(e) => setInputVal(e.target.value)}
          />
          <SelectFolderButton onClick={handleClick}>
            Select Folder
          </SelectFolderButton>
        </div>
      </Card>
    </StyledContainer>
  );
};

export default NewProjectModal;
