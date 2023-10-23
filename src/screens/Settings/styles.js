import LinearGradient from "react-native-linear-gradient";
import styled from "styled-components/native";

import { theme } from "../../constants/theme";

export const Container = styled.ScrollView`
width: 100%;
height: 100%;
background-color: #00000000;
padding-top: 24px;
padding-horizontal: 24px;
`;

export const DeleteButton = styled.TouchableOpacity`
  width: 100%;
  height: 36px;
  align-items: center;
  justify-content: center;
  border: 1px red solid;
  border-radius: 12px;
  margin-top: 12px;
  margin-bottom: 32px;
`;

export const Body = styled(LinearGradient).attrs({
  colors: ["#3AB5EA", "#34B797"],
  useAngle: true,
  angle: 90,
  angleCenter: { x: 0.1, y: 0.5 },
})`
  flex: 1;
  
`;