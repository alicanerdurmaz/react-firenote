import React from 'react';
import styled from 'styled-components/macro';

const CancelIcon = () => {
  return (
    <StyledCancelIcon>
      <svg focusable='false' height='24px' viewBox='0 0 24 24' width='24px' xmlns='http://www.w3.org/2000/svg'>
        <path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'></path>
        <path d='M0 0h24v24H0z' fill='none'></path>
      </svg>
    </StyledCancelIcon>
  );
};

export const StyledCancelIcon = styled.svg`
  width: 24px;
  height: 24px;
  fill: #ff2e63;
  vertical-align: bottom;
`;

export default CancelIcon;