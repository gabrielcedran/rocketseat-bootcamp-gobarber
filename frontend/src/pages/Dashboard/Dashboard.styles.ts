import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 144px;
  background-color: #28262e;
`;

export const Header = styled.header`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

export const HeaderContent = styled.div`
  display: flex;
  flex: 1;
  max-width: 1120px;
  align-items: center;
  justify-content: center;

  > img {
    height: 80px;
  }

  button {
    border: 0;
    /** this property with auto makes the element occupy all the available content to the left with margin */
    margin-left: auto;
    background-color: transparent;

    svg {
      font-size: 16px;
      color: #999591;
      width: 20px;
      height: 20px;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  padding-left: 80px;
  img {
    border-radius: 50%;
    width: 56px;
    height: 56px;
  }

  div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;

    span {
      color: #f4ede8;
    }

    strong {
      color: #ff9000;
    }
  }
`;
