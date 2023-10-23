import styled from "styled-components/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { HStack } from 'native-base'
import { theme } from "../../constants/theme";
import LinearGradient from "react-native-linear-gradient";

export const Container = styled(LinearGradient).attrs({
  colors: ["#1EA081", "#3A76EA"],
  useAngle: true,
  angle: 90,
  angleCenter: { x: 0.3, y: 0.5 },
})`
  flex: 1;
  justify-content: flex-end;
`;

export const Header = styled(HStack)`
  height: 120px
  width: 90%
  padding: 16px
  border-radius: 35px
  align-items: center
  background: #302E44
  position: absolute
  top: -75px
  z-index: 2
`;

export const LastNotification = styled.TouchableOpacity`
  flex-direction: row;
  border-radius: 5px;
  align-items: flex-end;
  justify-content: center
  width: 100%;
  height: 82%
  padding: 16px;
  background-color: #00000000
`;

export const TabContentContainer = styled.View`
  flex: 1;
`;

export const VerticalBar = styled.View`
  width: 4px;
  height: 100%;
  margin-right: 8px;
  background-color: ${theme.primaryColor};
`;

export const YouTubeCard = styled.View`
  margin-top: 16px;
  margin-bottom: 22px;
`;

export const YoutubeIcon = styled(MaterialCommunityIcons)`
  position: absolute;
  left: 40%;
  top: 40%;
`;
