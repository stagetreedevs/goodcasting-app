import { VStack } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';

import {theme} from '../../constants/theme';

export const Container = styled(LinearGradient).attrs({
  colors: ["#1EA081", "#3AABEA"],
  useAngle: true,
  angle: 90,
  angleCenter: { x: 0.3, y: 0.5 },
})`
  flex: 1;
  justify-content: flex-end;
`;

export const Choose = styled(VStack)`
  flex: 1;
  backgroundColor: #232131
  borderTopRightRadius: 25
  borderTopLeftRadius: 25
  padding: 5%
`;