import { HStack } from 'native-base';
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
export const Header = styled(HStack)`
  height: 6%
  margin: 0
  justify-content: space-between
  align-items: center
  paddingHorizontal: 5%
`;