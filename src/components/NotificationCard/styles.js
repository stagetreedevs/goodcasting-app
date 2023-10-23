import LinearGradient from "react-native-linear-gradient";
import styled from "styled-components/native";

import { theme } from "../../constants/theme";

export const Container = styled.View`
  flex-direction: row;
  width: 100%;
  overflow: visible;
  border-radius: 15px
`;
export const VerticalBar = styled.View`
  width: 4px;
  height: 100%;
  background-color: ${(props) =>
    props.type === "invite-accepted"
      ? theme.linkButtonColor
      : theme.primaryColor};
`;

export const InformationContainer = styled.View`
  margin-left: 8px;
`;

export const Title = styled.Text`
  font-size: 14px;
  color: ${theme.tagText};
  font-weight: 500;
`;

export const Content = styled.Text`
  font-size: 12px;
  color: ${theme.tagText};
  margin-top: 4px;
`;

export const Time = styled.Text`
  position: absolute;
  bottom: 8px;
  right: 16px;
  font-size: 10px;
  color: ${theme.mutedText};
`;

export const IconCloseContainer = styled.TouchableOpacity`
  position: absolute;
  background-color: ${theme.primaryColor};
  border-radius: 25px
  right: -10px;
  top: -12px;
  padding: 4px
  z-index: 2
`;
