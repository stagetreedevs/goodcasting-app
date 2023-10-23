import styled from 'styled-components/native';

import {theme} from '../../constants/theme';

export const Container = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-horizontal: 20px;
  padding-vertical: 10px;

  border-radius: 15px;
  border-width: 1px;
  border-color: ${theme.inputBorderColor};
`;

export const ActionContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Label = styled.Text`
  font-size: 14px;
  color: ${theme.mutedText};
`;

export const CountLabel = styled.Text`
  font-size: 14px;
  width: 30px;
  text-align: center;
`;
