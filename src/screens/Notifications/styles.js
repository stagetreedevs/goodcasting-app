import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';

import {theme} from '../../constants/theme';

export const Container = styled.View`
  width: 100%;
  height: 100%;
  background-color: #00000000;
  padding-top: 24px;
  padding-horizontal: 24px;
`;

export const Body = styled(LinearGradient).attrs({
  colors: ["#3AB5EA", "#34B797"],
  useAngle: true,
  angle: 90,
  angleCenter: { x: 0.1, y: 0.5 },
})`
  flex: 1;
  
`;
