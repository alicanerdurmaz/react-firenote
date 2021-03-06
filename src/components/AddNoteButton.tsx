import React from 'react';
import styled from 'styled-components/macro';

type Props = {
  setShowNewNoteModal: React.Dispatch<React.SetStateAction<boolean>>;
};
const AddNoteButton = ({ setShowNewNoteModal }: Props) => {
  return (
    <StyledAddNoteButtonContainer onClick={(e) => setShowNewNoteModal(true)}>
      <Fab>
        <svg
          width='24px'
          height='24px'
          aria-hidden='true'
          focusable='false'
          data-prefix='fas'
          data-icon='plus'
          role='img'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 448 512'>
          <path
            fill='#ffb6b9'
            d='M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z'></path>
        </svg>
      </Fab>
    </StyledAddNoteButtonContainer>
  );
};
const StyledAddNoteButtonContainer = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
  bottom: 16px;

  right: 0;
  margin-right: 16px;
  z-index: 5;
  background: ${(props) => props.theme.backgroundColor};
  border-radius: 50%;
`;
const Fab = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${(props) => props.theme.backgroundColorsecondary};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.16), 0px 1px 4px rgba(0, 0, 0, 0.16);
  -webkit-tap-highlight-color: transparent;
  @media (min-width: 600px) {
    &:hover {
      background: #364f6b;
    }
  }

  &:active {
    transform: scale(0.9);
  }
`;

export default AddNoteButton;
