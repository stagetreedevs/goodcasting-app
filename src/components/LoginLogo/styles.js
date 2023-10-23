import styled from 'styled-components/native';
import {theme} from '../../constants/theme';

export const Container = styled.View`
  width: 70%;
  height: 75px;
  justify-content: center;
  align-items: center;
`;

export const GreenBar = styled.View`
  position: absolute;
  height: 39px;
  width: 100%;
  top: ${props => props.top}px;
  left: ${props => props.left}px;
  background-color: ${theme.primaryColor};
`;

export const Logo = styled.Image`
  width: 130px;
  resize-mode: contain;
  top: 5px;
`;
