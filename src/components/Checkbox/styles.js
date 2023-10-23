import styled from 'styled-components/native';
import {theme} from '../../constants/theme';

export const Container = styled.View`
  width: 100%;
  height: 30px;
  flex-direction: row;
  align-items: center;
`;

export const Box = styled.TouchableOpacity`
  width: 28px;
  height: 28px;
  border-radius: 3px;
  border-width: 1px;
  border-color: ${props =>
    props.selected ? theme.primaryColor : theme.inputBorderColor};
  background-color: ${props =>
    props.selected ? theme.primaryColor : 'transparent'};
  margin-right: 8px;
`;
