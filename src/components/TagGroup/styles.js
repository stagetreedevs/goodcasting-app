import styled from 'styled-components/native';

import {theme} from '../../constants/theme';

export const Container = styled.View``;

export const TagsContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

export const TagContainer = styled.TouchableOpacity`
  background-color: ${props =>
    props.selected ? theme.primaryColor : 'transparent'};
  border-color: ${props =>
    props.selected ? theme.primaryColor : theme.inputBorderColor};
  border-width: 1px;
  border-radius: 15px;
  align-self: flex-start;
  padding-horizontal: 10px;
  padding-vertical: 4px;
`;

export const TagText = styled.Text`
  color: ${props =>
    props.selected ? theme.primaryTextColor : theme.mutedText};
`;
