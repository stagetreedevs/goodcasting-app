import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';

import {theme} from '../../constants/theme';

export const Wrapper = styled.View`
  position: absolute;
  background-color: #00000040;
  width: ${props => props.width}px;
  flex: 1
  padding-top: 50%;
`;

export const Container = styled.View`
  background-color: #232131;
  width: 100%;
  height: 100%;
  padding: 20px;
  padding-top: 50px;
  border-radius: 30px;
`;

export const Header = styled.View`
  width: 100%;
  min-height: 200px;
  align-items: center;
  background-color: #302E44;
  padding: 20px;
  border-radius: 30px;
`;

export const HeaderButton = styled.TouchableOpacity`
  width: 44px;
  height: 44px;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 32%;
  right: 2.5%;
  z-index: 3;
`;

export const Content = styled.View`
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding-bottom: 20px;
`;

export const ContentRow = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
`;
export const Field = styled.View`
  width: 45%;
  background: #302E44
  flex-direction: column;
  margin: 2.5%
  paddingHorizontal: 12px
  paddingVertical: 20px
  border-radius: 16px
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const ButtomContainer = styled.View`
  width: 100%;
  align-items: center;
  margin-bottom: 8px;
  margin-top: 8px;
`;
export const Buttom = styled(LinearGradient).attrs({
  useAngle: true,
  angle: 90,
  angleCenter: { x: 0.1, y: 0.5 },
})`
  height: 45px;
  width: 80%;
  align-items: center;
  justify-content: center;
  border-radius: 24px;
  margin-vertical: 10px
`