import styled from 'styled-components/native';

import {theme} from '../../constants/theme';

export const Container = styled.TouchableOpacity`
  flex-direction: row;
`;

export const Label = styled.View`
  background-color: ${theme.primaryColor};
  justify-content: center;
  align-items: center;
  padding-horizontal: 12px;
  padding-vertical: 2px;
  border-radius: 12px;
  margin-left: 10px;
`;
