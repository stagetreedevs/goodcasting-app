import styled from 'styled-components/native';
import {Dimensions} from 'react-native';

import {theme} from '../../constants/theme';
import { Image } from 'native-base';

const screen = Dimensions.get('screen');

export const Container = styled.TouchableOpacity`
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const CategoryImage = styled.Image`
  width: ${screen.width - 72}px;
  height: ${screen.width - 72}px;
  resize-mode: cover;
  border-radius: ${(screen.width / 2).toFixed(0)}px;
  margin-bottom: 10px;
  border-color: ${props =>
    props.selected ? theme.primaryColor : 'transparent'};
  border-width: 5px;
`;
