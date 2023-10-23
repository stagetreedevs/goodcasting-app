import styled from 'styled-components/native';
import {theme} from '../../constants/theme';

export const Container = styled.View`
  width: 100%;
  height: 100%;
  padding-horizontal: 36px;
  padding-top: 36px;
  background-color: ${theme.backgroundColor};
`;

export const TermsContainer = styled.ScrollView`
  width: 100%;
  height: 100%;
`;
