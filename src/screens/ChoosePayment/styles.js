import styled from 'styled-components/native';

import {theme} from '../../constants/theme';

export const Container = styled.ScrollView`
  width: 100%;
  height: 100%;
  background-color: ${theme.backgroundColor};
  padding-top: 24px;
  padding-horizontal: 24px;
`;
