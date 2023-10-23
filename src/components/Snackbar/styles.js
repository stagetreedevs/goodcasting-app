import styled from 'styled-components/native';

import {theme} from '../../constants/theme';

export const Container = styled.View`
  background-color: ${theme.backgroundColor};
  width: 200px;
  height: 200px;
  border-radius: 10px;
`;

export const NotificationText = styled.Text`
  color: ${theme.primaryTextColor};
`;
