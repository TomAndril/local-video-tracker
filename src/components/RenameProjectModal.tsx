import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from 'store';
import { RiCloseFill } from 'react-icons/ri';
import { handleOpenRenameProjectModal } from '../store/slices/UISlice';
import { colors } from '../styles/Constants';
import { renameProject } from '../store/slices/projectsSlice';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Modal = styled.div`
  position: relative;
  background-color: ${colors.GREEN};
  padding: 3%;
  border-radius: 3px;
`;

const Text = styled.p`
  font-size: 0.875em;
  color: ${colors.LIGHTGREY};
`;

const Input = styled.input`
  width: 100%;
  margin-top: 5%;
  padding: 5px;
  outline: none;
`;

const CloseButton = styled.div`
  position: absolute;
  right: 5px;
  top: 5px;
  padding: 5px;
`;

const RenameProjectModal = () => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector(
    (state: RootState) => state.UI.isRenameProjectModalOpen
  );

  const project = useSelector((state: RootState) =>
    state.projects.projects.find(
      (proj) => proj.id === state.projects.selectedProjectId
    )
  );

  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState(false);
  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setError(false);
    if (e.key === 'Enter') {
      if (inputValue.length <= 1) {
        setError(true);
        return;
      }
      if (project) {
        dispatch(
          renameProject({ projectId: project?.id, projectName: inputValue })
        );
        setInputValue('');
        dispatch(handleOpenRenameProjectModal(false));
      }
    }
  };

  if (!isModalOpen) {
    return null;
  }

  return (
    <Container>
      <Modal>
        <Text>Type the project name and press enter to confirm</Text>
        <Input
          autoFocus
          placeholder="New Project Name"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => handleEnter(e)}
        />
        <CloseButton>
          <RiCloseFill
            color={colors.LIGHTGREY}
            size={24}
            style={{ cursor: 'pointer' }}
            onClick={() => {
              setInputValue('');
              setError(false);
              dispatch(handleOpenRenameProjectModal(false));
            }}
          />
        </CloseButton>
        {error && (
          <Text style={{ color: colors.LIGHTGREY, marginTop: '3%' }}>
            Project name cannot be empty
          </Text>
        )}
      </Modal>
    </Container>
  );
};

export default RenameProjectModal;
