import React from 'react';
import styled from 'styled-components/macro';
import { INote } from '../../context/NoteContext/noteTypes';
import { useNoteContext } from '../../context/NoteContext/NoteContext';
import { fireStorePinTest } from '../../context/NoteContext/firestoreFunctions';

type Props = {
  note: INote;
};
type StyledProps = {
  color: string;
};
type PinButtonProps = {
  pinned: boolean;
};
const NotesListItem = ({ note }: Props) => {
  const { uid, color, content, createdAt, lastEdited, tags, title, pinned } = note;
  const pinNoteHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    fireStorePinTest(!pinned, uid);
  };
  return (
    <BoxContainer color={color}>
      <StyledNotesListItem>
        <NoteHeader>
          <SelectNoteButton></SelectNoteButton>
          <NoteTitle>{title}</NoteTitle>
          <PinButton onClick={e => pinNoteHandler(e)} pinned={pinned}></PinButton>
        </NoteHeader>
        <NoteContent>
          <span>{content}</span>
        </NoteContent>
        <TagList>
          {tags[0] && (
            <TagTextContainer>
              <TagText>{tags[0]}</TagText>
            </TagTextContainer>
          )}

          {tags[1] && (
            <TagTextContainer>
              <TagText>{tags[1]}</TagText>
            </TagTextContainer>
          )}
          {tags.length > 2 && (
            <TagTextBox>
              <TagText>+{tags.length - 2}</TagText>
            </TagTextBox>
          )}
        </TagList>
      </StyledNotesListItem>
    </BoxContainer>
  );
};
const SelectNoteButton = styled.div`
  background-size: 24px 24px;
  height: 24px;
  width: 24px;
  background-image: ${props => props.theme.selectNoteButton};
`;
const PinButton = styled.div<PinButtonProps>`
  visibility: ${props => (props.pinned ? 'visible' : 'hidden')};
  user-select: none;
  background-size: 24px 24px;
  height: 24px;
  width: 24px;
  opacity: 0.5;
  padding: 8px 12px 0px 0px;
  background-position: center;
  background-repeat: no-repeat;
  background-image: ${props => (props.pinned ? props.theme.pinnedIcon : props.theme.pinIcon)};
  will-change: transform;
  transition: transform 60ms ease-in-out;
  &:hover {
    opacity: 1;
    transform: rotate(40deg);
  }
`;

const BoxContainer = styled.div<StyledProps>`
  @media (max-width: 900px) {
    min-height: 100%;
    max-height: 100%;
  }
  will-change: transform;
  min-height: 100%;
  max-height: 100%;
  border: 1px solid ${props => props.theme.borderColor};
  border-radius: 4px;
  background: ${props => props.theme.backgroundColor};
  transition: all 60ms ease-in-out;
  cursor: pointer;
  &:hover {
    ${PinButton} {
      visibility: visible;
    }
    border: 1px solid ${props => props.theme.textColorPrimary};
  }
`;

const StyledNotesListItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
`;

const NoteHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const NoteTitle = styled.div`
  color: ${props => props.theme.textColorPrimary};
  text-align: start;
  margin-bottom: 8px;
  margin-top: 10px;
  font-weight: 600;
  padding: 0px 16px;
`;
const NoteContent = styled.div`
  color: ${props => props.theme.textColorPrimary};
  text-align: start;
  padding: 0px 16px;

  span {
    text-overflow: ellipsis;
    white-space: pre-wrap;
    word-wrap: break-word;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

const TagList = styled.div`
  cursor: pointer;
  margin-top: 8px;
  margin-bottom: 2px;
  padding: 0px 8px;
  display: flex;
  flex-wrap: wrap;
  -webkit-tap-highlight-color: transparent;
`;
const TagTextContainer = styled.div`
  user-select: none;
  min-width: 35px;
  height: 18px;
  box-shadow: inset 0 0 0 1px rgba(154, 160, 166, 0.541);
  padding: 3px 6px;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 4px 2px;
`;
const TagText = styled.div`
  user-select: none;
  color: ${props => props.theme.textColorSecondary};
  font-size: 14px;
  max-width: 24ch;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 20px;
`;
const TagTextBox = styled(TagTextContainer)`
  border-radius: 2px;
  min-width: 15px;
`;

export default NotesListItem;
