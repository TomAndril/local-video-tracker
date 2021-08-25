import React from 'react';
import { useSelector } from 'react-redux';
import { ImCheckboxUnchecked, ImCheckboxChecked } from 'react-icons/im';
import styled from 'styled-components';
import { RootState } from '../store';
import { colors } from '../styles/Constants';
import getFolderName from '../utils/getFolderName';

const Container = styled.div`
  width: 20%;
  height: 100vh;
  position: absolute;
  right: 0;
  background-color: ${colors.WHITE};
  border-left: 1px solid lightgray;
  overflow-y: auto;
  scroll-behavior: smooth;

  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 10px;
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${colors.BLUE};
    border-radius: 3px;
  }
`;

const Video = styled.div`
  height: 10%;
  border-bottom: 1px solid lightgray;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875em;
  padding: 0 5%;
`;

const PlaylistTitle = styled.div`
  background-color: ${colors.BLACK};
  color: ${colors.WHITE};
  font-size: 0.875em;
  height: 5%;
  display: flex;
  align-items: center;
  padding: 5px 5%;
  text-align: center;
`;

const SidePlaylist = () => {
  const videos = useSelector(
    (state: RootState) => state.projects.selectedSubFolder
  );

  return (
    <Container>
      <PlaylistTitle>
        {getFolderName(videos?.folderName || 'No Name')}
      </PlaylistTitle>
      {videos?.videos.map((elem) => (
        <a
          href={`#${elem.id}`}
          key={elem.id}
          style={{ textDecoration: 'none', color: colors.BLACK }}
        >
          <Video>
            <p>{elem.name}</p>
            {elem.completed ? (
              <ImCheckboxChecked color={colors.BLUE} />
            ) : (
              <ImCheckboxUnchecked color={colors.BLACK} />
            )}
          </Video>
        </a>
      ))}
    </Container>
  );
};

export default SidePlaylist;
