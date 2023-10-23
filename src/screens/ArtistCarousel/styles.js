import {Dimensions} from 'react-native';
import styled from 'styled-components/native';

import {theme} from '../../constants/theme';

const screen = Dimensions.get('screen');

export const Container = styled.ScrollView`
  width: 100%;
  height: 100%;
  padding: 24px;
  background-color: ${theme.backgroundColor};
`;

export const PhotoContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 64px;
`;

export const Photo = styled.Image`
  width: ${screen.width - 128}px;
  height: ${screen.height - 180}px;
  resize-mode: contain;
`;
