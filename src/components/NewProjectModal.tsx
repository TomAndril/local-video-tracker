/* eslint-disable consistent-return */
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
import folderContainsVideos from '../utils/folderHasVideos';
import { Dialog } from 'electron';

const { showMessageBox }: Dialog = require('electron').remote.dialog;

const StyledContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;

const Card = styled.div`
  background-color: ${colors.BLACK};
  padding: 5%;
  border-radius: 3px;
  position: relative;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
`;

const Title = styled.p`
  color: ${colors.LIGHTGREY};
  font-weight: bold;
  font-size: 0.875em;
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
    color: ${colors.BLACK};
    font-weight: bold;
  }
  padding-left: 5%;
  background-color: ${colors.LIGHTGREY};
`;

const CloseBar = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  align-items: center;
  justify-content: flex-end;
  display: flex;
`;

const SelectFolderButton = styled.div`
  background-color: ${colors.BLUE};
  cursor: pointer;
  border-radius: 5px;
  color: ${colors.WHITE};


  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ErrorMessage = styled.p`
  color: ${colors.LIGHTGREY};
  position: absolute;
  top: 165px;
`;

const NewProjectModal: React.FC = () => {
  const [inputVal, setInputVal] = useState('');
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  const isOpen = useSelector(
    (state: RootState) => state.UI.isNewProjectModalOpen
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (error) {
      setError(false);
    }
    setInputVal(e.target.value);
  };

  // CUSTOM HOOKS
  const { openDialog } = useFolderSelector();
  const { createProject } = useProjects();

  // CLOSE MODAL ACTION
  const handleCloseModal = () => {
    setError(false);
    dispatch(handleOpenNewProjectModal(false));
  };

  // SELECT FOLDER ACTION
  const handleSelectFolder = () => {
    if (inputVal.length <= 0) {
      return setError(true);
    }

    openDialog()
      .then((res) => {
        if (!folderContainsVideos(res)) {
          return showMessageBox({
            type: 'info',
            title: 'Local Video Tracker',
            message: 'No videos found',
            detail: `The selected folder doesn't contain any subfolders with videos.`,
          });
        }
        const id = uuid();
        createProject({ title: inputVal, rootFolder: res, id });
        setInputVal('');
        setError(false);
        dispatch(setSelectedProjectId(id));
        dispatch(handleOpenNewProjectModal(false));
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
              color={colors.LIGHTGREY}
              style={{ cursor: 'pointer' }}
              size="2em"
              onClick={handleCloseModal}
            />
          </CloseBar>
          <Input
            type="text"
            placeholder='Project Name'
            value={inputVal}
            autoFocus
            onChange={(e) => handleChange(e)}
          />
          {error && <ErrorMessage>Project must have a name</ErrorMessage>}

          <SelectFolderButton onClick={handleSelectFolder}>
            Select Folder
          </SelectFolderButton>
        </div>
      </Card>
    </StyledContainer>
  );
};

export default NewProjectModal;
