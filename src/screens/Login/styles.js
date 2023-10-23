import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';
import {theme} from '../../constants/theme';

export const Body = styled(LinearGradient).attrs({
  colors: ["#3AB5EA", "#34B797"],
  useAngle: true,
  angle: 90,
  angleCenter: { x: 0.1, y: 0.5 },
})`
  flex: 1;
  
`;

export const Container = styled.ScrollView`
  padding: 5%;
  padding-top: 15%;
  padding-horizontal: 24px;
  background: #232131;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
`;