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

export const Container = styled.View`
  width: 100%;
  height: 100%;
  background-color: #00000000;
`;

export const Header = styled.View`
  padding-horizontal: 18px;
  padding-top: 25px;
`;

export const ArtistsScroll = styled.View`
  width: 100%;
  padding-horizontal: 36px;
  padding-top: 36px;
`;

export const ArtistsContainer = styled.View`
  width: 100%;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
`;
export const Tag = styled.TouchableOpacity`
  flex-direction: row;
`;

export const Label = styled.View`
  background-color: ${theme.primaryColor};
  justify-content: center;
  align-items: center;
  padding-horizontal: 12px;
  padding-vertical: 2px;
  border-radius: 12px;
  margin-left: 10px;
`;