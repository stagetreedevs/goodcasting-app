import styled from 'styled-components/native';

import {theme} from '../../constants/theme';

export const Container = styled.View`
  border-bottom-width: 1px;
  border-color: ${theme.mutedText};
  width: 100%;
  padding: 5px;
`;

export const CardTitle = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: #fff
`;

export const CardUser = styled.Text`
  font-size: 12px;
  color: #000;
  color: #fff
`;

export const TextBold = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #fff
`

export const CardContent = styled.Text`
  font-size: 12px;
  margin-top: 8px;
  color: #fff
`;

export const CardLocation = styled.Text`
  font-size: 12px;
  font-weight: 300;
  margin-top: 8px;
  margin-bottom: 16px;
  color: #fff
`;
