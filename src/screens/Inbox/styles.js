import styled from 'styled-components/native';

import {theme} from '../../constants/theme';
import LinearGradient from "react-native-linear-gradient";

export const Container =  styled(LinearGradient).attrs({
  colors: ["#3AB5EA", "#34B797"],
  useAngle: true,
  angle: 90,
  angleCenter: { x: 0.1, y: 0.5 },
})`
  width: 100%;
  height: 100%;
  background-color: ${theme.backgroundColor};
`;
