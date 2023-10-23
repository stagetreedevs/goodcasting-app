import styled from 'styled-components/native';

import {theme} from '../../constants/theme';

export const Container = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${theme.primaryOpacity};
  padding-horizontal: 8px;
  padding-vertical: 16px;
  border-radius: 32px;
  position: relative;
`;

export const InformationContainer = styled.View`
  margin-left: 16px;
  width: ${props => (props.withPhoto ? '70%' : '85%')};
`;

export const Title = styled.Text`
  margin-bottom: 8px;
  font-weight: 500;
  width: 65%;
`;

export const LastMessageContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const LastMessageContent = styled.Text`
  font-size: 12px;
  color: ${theme.primaryTextColor};
`;

export const LastMessageTime = styled.Text`
  font-size: 11px;
  color: ${theme.mutedText};
  position: absolute;
  top: -22px;
  right: 0px;
`;

export const PhotoContainer = styled.View`
  position: relative;
`;

export const Photo = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;
