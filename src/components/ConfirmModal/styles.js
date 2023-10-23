import styled from 'styled-components/native';
import {theme} from '../../constants/theme';

export const Wrapper = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${theme.wrapperBackground};
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  z-index: 2;
  padding-horizontal: 24px;
  padding-top: 24px;
  padding-bottom: 64px;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.View`
  background-color: #232131;
  width: 100%;
  height: ${props => props.noHeight ? 'auto' : '220px'};
  border-radius: 25px;
  justify-content: space-around;
  align-items: center;
  padding: 16px;
`;

export const ActionContainer = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: space-around;
  margin-top: 16px;
`;
