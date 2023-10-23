import styled from 'styled-components/native';

import {theme} from '../../constants/theme';

export const Container = styled.TouchableOpacity`
  width: 100%;
  height: 74px;
  background-color: ${theme.primaryOpacity};
  padding: 16px;
  border-radius: 30px;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const InformationContainer = styled.View`
  width: 100%;
`;

export const Name = styled.Text`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
  color: ${theme.primaryTextColor};
`;

export const Description = styled.Text`
  font-size: 12px;
  color: ${theme.mutedText};
`;

export const Time = styled.Text`
  font-size: 12px;
  color: ${theme.primaryColor};
`;

export const PhotoContainer = styled.View`
  position: relative;
`;

export const Photo = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

export const NotificationTag = styled.View`
  position: absolute;
  top: 0;
  right: 0;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: ${theme.primaryColor};
`;

export const NotificationTagText = styled.Text`
  font-weight: bold;
  font-size: 12px;
`;
