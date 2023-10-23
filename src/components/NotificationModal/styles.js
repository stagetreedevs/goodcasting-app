import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';

import {theme} from '../../constants/theme';

export const Wrapper = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${theme.wrapperBackground};
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  z-index: 2;
  padding-horizontal: 24px;
  padding-top: 24px;
  padding-bottom: 64px;
`;

export const Container = styled.View`
background-color: #232131
  width: 100%;
  height: auto;
  border-radius: 30px;
  border: .25px solid #fff
`;

export const Header = styled.View`
  width: 100%;
  min-height: 120px;
  justify-content: center;
  align-items: center;
  background-color: rgb(134, 255, 250);
  padding: 30px;
  border-radius: 30px;
`;

export const HeaderButton = styled.TouchableOpacity`
  width: 44px;
  height: 44px;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 3;
`;

export const Content = styled.View`
  width: 100%;
  padding: 30px;
`;

export const ContentRow = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
`;
export const Field = styled.View`
  width: ${props => (props.row ? '50%' : '100%')};
  flex-direction: column;
  margin-bottom: 15px;
`;
