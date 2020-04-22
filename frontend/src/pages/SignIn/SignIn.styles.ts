import styled from 'styled-components';
import { shade } from 'polished';
import signInBackground from '../../assets/sign-in-background.png';

export const Container = styled.div`
  height: 100vh;
  /**VH stands for view port hight -> 100vh means 100% of the visible content on the screen. Setting 100%, other tags must also be set to 100% (html, body, etc)*/
  display: flex;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-basis: 700px;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }

    a {
      color: #f4ede8;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }

  /** Only anchors which are direcly one level below the wrapping div */
  > a {
    color: #ff9000;
    display: flex;
    align-items: center;
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: ${shade(0.2, '#ff9000')};
    }

    svg {
      margin-right: 16px;
    }
  }
`;

export const Background = styled.div`
  /** flex: 1 means this container will grow or shrink accoridng to the space left */
  flex: 1;
  background: url(${signInBackground}) no-repeat center;
  /**As the image has a limited size, if the screen is bigger, then the image does not fulfill all the space. This property is to
  force the image strech */
  background-size: cover;
`;
