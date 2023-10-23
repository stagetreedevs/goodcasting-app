import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';

import {theme} from '../../../constants/theme';

export const Container = styled.ScrollView`
  flex: 1;
  padding: 36px;
  margin-bottom: 45px;
  background: #00000000,
`;
export const Body = styled(LinearGradient).attrs({
  colors: ["#3AB5EA", "#34B797"],
  useAngle: true,
  angle: 90,
  angleCenter: { x: 0.1, y: 0.5 },
})`
  flex: 1;
`;