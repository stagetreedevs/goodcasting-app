import styled from 'styled-components/native';

import {theme} from '../../constants/theme';

export const Container = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
`;

export const TagButton = styled.TouchableOpacity`
  border-width: 1px;
  border-color: ${props =>
    props.selected ? theme.primaryColor : theme.inputBorderColor};
  padding-horizontal: 20px;
  padding-vertical: 4px;
  margin-right: 6px;
  margin-bottom: 6px;
  border-radius: 3px;
  background-color: ${props =>
    props.selected ? theme.primaryColor : 'transparent'};
`;

export const TagText = styled.Text`
  font-size: 12px;
  color: #fff
`;
