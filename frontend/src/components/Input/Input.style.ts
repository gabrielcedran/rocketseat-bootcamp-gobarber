import styled, { css } from 'styled-components';

// Extra properties defined for this component to control style according to state
interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
  background: #232129;
  border-radius: 10px;
  padding: 16px;
  width: 100%;

  border: 2px solid #232129;
  color: #666360;

  & + div {
    margin-top: 8px;
  }

  /** Way to access react properties when defining styles */
  ${props =>
    props.isFocused &&
    css`
      border-color: #ff9000;
      color: #ff9000;
    `}

  ${props =>
    props.isFilled &&
    css`
      color: #ff9000;
    `}

  input {
    background: transparent;
    flex: 1;
    border: 0;
    color: #f4ede8;

    &::placeholder {
      color: #666360;
    }

    /** Hacks to not screw style when autocompleting */
    -webkit-text-fill-color: #666360;
    -webkit-box-shadow: 0 0 0px 1000px #232129 inset;
  }

  svg {
    margin-right: 10px;
  }
`;
