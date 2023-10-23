import styled from 'styled-components/native';

import {theme} from '../../constants/theme';

export const Container = styled.View``;

export const MarkerContainer = styled.View`
  width: 44px;
  height: 44px;
  padding: 34px;
`;

export const Marker = styled.View`
  width: 10px;
  height: 10px;
  background-color: ${theme.backgroundColor};
  border-radius: 3px;
  border-width: 1px;
  border-color: gray;
  top: -3px;
`;
