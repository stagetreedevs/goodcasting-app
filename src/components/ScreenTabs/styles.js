import styled from 'styled-components/native';

import {theme} from '../../constants/theme';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 30px;
  margin-bottom: 12px;
`;

export const Tab = styled.TouchableOpacity`
  width: ${props => props.width}%;
  height: 30px;
  border-width: 1px;
  border-color: ${props =>
    props.active ? theme.primaryColor : theme.inputBorderColor};
  background-color: ${props =>
    props.active ? theme.primaryColor : 'transparent'};
  border-radius: 5px;
  justify-content: center;
  align-items: center;
`;
