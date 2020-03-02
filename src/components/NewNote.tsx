import React, { useState, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components/macro';
import TextareaAutosize from 'react-textarea-autosize';
import firebase, { firestore } from '../components/Firebase/firebase';
import { useAuthContext } from '../context/AuthContext';
import SelectColorPanel from './SelectColorPanel';
import SelectTagPanel from './SelectTagPanel';
import { firestoreAddNote } from '../context/FirebaseContext/firestoreFunctions';

type Props = {
  setShowNewNoteModal: React.Dispatch<React.SetStateAction<boolean>>;
};
type styleProps = {
  bgColor: string;
};

interface INotes {
  title: string;
  content: string;
  tags: string[];
  color: string;
}

const NewNote = ({ setShowNewNoteModal }: Props) => {
  const themeContext = useContext(ThemeContext);
  const { currentUser } = useAuthContext();
  const [note, setNote] = useState<INotes>({
    title: '',
    content: '',
    tags: [],
    color: themeContext.backgroundColor
  });

  const cancelHandler = () => {
    setShowNewNoteModal(false);
  };

  const newNoteController = () => {
    if (!currentUser) {
      return;
    } else if (note.title.length < 1 || note.content.length < 1) {
      return;
    } else {
      firestoreAddNote(currentUser.uid, note);
    }
  };

  const newNoteInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setNote(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const selectColor = (colorCode: string) => {
    setNote(prevState => ({
      ...prevState,
      color: colorCode
    }));
  };
  const addTag = (list: string[]) => {
    setNote(prevState => ({
      ...prevState,
      tags: list
    }));
  };
  return (
    <Modal>
      <TakeNoteContainer bgColor={note.color}>
        <InputArea>
          <TitleInput bgColor={note.color}>
            <TextareaAutosize
              maxLength={30}
              maxRows={2}
              placeholder='Title'
              onChange={e => newNoteInput(e)}
              name='title'></TextareaAutosize>
          </TitleInput>
          <ContentInput bgColor={note.color}>
            <TextareaAutosize
              maxLength={999}
              maxRows={6}
              placeholder='Take a note...'
              onChange={e => newNoteInput(e)}
              name='content'></TextareaAutosize>
          </ContentInput>
          <TagListContainer>
            {note.tags.map(e => {
              return (
                <TagTextContainer key={e}>
                  <TagText>{e}</TagText>
                </TagTextContainer>
              );
            })}
          </TagListContainer>
        </InputArea>

        <BottomBar>
          <ButtonGroupOne>
            <SelectTagPanel addTag={addTag} userId={currentUser.uid}></SelectTagPanel>
            <SelectColorPanel selectedColorProp={note.color} selectColor={selectColor}></SelectColorPanel>
          </ButtonGroupOne>
          <ButtonGroupTwo>
            <SaveButton onClick={newNoteController}>SAVE</SaveButton>
            <CancelButton onClick={cancelHandler}>CANCEL</CancelButton>
          </ButtonGroupTwo>
        </BottomBar>
      </TakeNoteContainer>
    </Modal>
  );
};

const Modal = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
`;

const TakeNoteContainer = styled.div<styleProps>`
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  justify-content: space-between;
  background: ${props => props.bgColor};
  height: 100%;
  width: 100%;
`;

const TitleInput = styled.div<styleProps>`
  padding: 8px 8px;
  overflow: hidden;
  textarea {
    resize: none;
    width: 100%;
    height: auto;
    background: ${props => props.bgColor};
    color: ${props => props.theme.textColorPrimary};
    font-size: 16px;
  }
`;
const ContentInput = styled.div<styleProps>`
  padding: 8px 8px;
  padding-top: 0px;
  overflow: hidden;
  textarea {
    resize: none;
    font-size: 16px;
    width: 100%;
    background: ${props => props.bgColor};
    color: ${props => props.theme.textColorPrimary};
  }
`;

const InputArea = styled.div`
  width: 100%;
`;

const BottomBar = styled.div`
  width: 100%;
  height: fit-content;
  padding-bottom: 8px;
  display: flex;
  justify-content: space-between;
`;

const ButtonGroupOne = styled.div`
  align-self: flex-start;
  flex: 0.2;
  padding-left: 16px;
  display: flex;
  justify-content: space-around;
`;
const ButtonGroupTwo = styled.div`
  align-self: flex-end;
  flex: 0.4;
  display: flex;
  justify-content: space-around;
  margin-right: 8px;
`;

const SaveButton = styled.button`
  height: 24px;
  background: #364f6b;
  color: ${props => props.theme.textColorPrimary};
  border: 0px;
  font-size: 13px;
  font-weight: 500;
  border-radius: 2px;
  cursor: pointer;
  text-align: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  -webkit-tap-highlight-color: transparent;
  &:active {
    transform: scale(0.9);
  }
`;
const CancelButton = styled.button`
  text-align: center;
  background: ${props => props.theme.warningColor};
  color: ${props => props.theme.textColorPrimary};
  border: 0px;
  font-size: 13px;
  font-weight: 500;
  border-radius: 2px;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  -webkit-tap-highlight-color: transparent;
  &:active {
    transform: scale(0.9);
  }
`;

const TagListContainer = styled.div`
  cursor: pointer;
  margin: 4px 8px;
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
  font-weight: 500;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 20px;
`;

export default NewNote;
