import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';

import {theme} from '../../../constants/theme';

export const Body = styled(LinearGradient).attrs({
  colors: ["#3AB5EA", "#34B797"],
  useAngle: true,
  angle: 90,
  angleCenter: { x: 0.1, y: 0.5 },
})`
  flex: 1;
  
`;

export const Container = styled.ScrollView`
  width: 100%;
  height: 100%;
  padding: 36px;
  padding-top: 0;
  padding-bottom: 100px;
  background-color: #00000000;
`;

export const ActionContainer = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
  position: absolute;
  padding-bottom: 60px
  padding-top: 10px
  bottom: 12.5%
`;
