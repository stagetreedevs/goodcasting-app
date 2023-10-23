import styled from 'styled-components/native';
import {Dimensions} from 'react-native';

import {theme} from '../../constants/theme';
import LinearGradient from 'react-native-linear-gradient';

const screen = Dimensions.get('screen');

export const Container = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  align-items: center;
`;

export const PhotoButton = styled.TouchableOpacity``;

export const Photo = styled.Image`
  width: 95px;
  height: 155px;
  resize-mode: cover;
  border-radius: 8px
  left: 0;
  border-width: .5px
  border-color: #71E5EC
`;

export const InformationContainer = styled(LinearGradient).attrs({
  colors: ['#FFFFFF20', '#FFFFFF59'],
  useAngle: true,
  angle: 180,
  angleCenter: { x: 0.3, y: 1.0 }
})`
  width: ${screen.width - 140}px;
  padding-horizontal: 5%;
  padding-vertical: 15px;
  border-width: .25px
  border-top-width: .35px
  border-bottom-width: 0
  border-style: solid
  border-color: #fff
  border-top-color: #c5c5c5
  border-top-right-radius: 16px
  border-bottom-right-radius: 16px
  margin-vertical: 15px
`;

export const InformationContainerHeader = styled.View`
  width: 85%;
`;

export const ActionContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin-top: 2.5%;
`;

export const MessageButton = styled.TouchableOpacity`
  background-color: #00000000;
  width: 34px;
  height: 34px;
  border-radius: 17px;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 20%;
  right: 5%
`;
