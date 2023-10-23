import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';

import {theme} from '../../constants/theme';

export const Container = styled(LinearGradient).attrs({
  colors: ["#1EA081", "#3AABEA"],
  useAngle: true,
  angle: 90,
  angleCenter: { x: 0.3, y: 0.5 },
})`
  width: 100%;
  height: 100%;
`;
