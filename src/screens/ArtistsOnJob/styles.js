import LinearGradient from "react-native-linear-gradient";
import styled from "styled-components/native";
import { theme } from "../../constants/theme";

export const Container = styled(LinearGradient).attrs({
  colors: ["#3AB5EA", "#34B797"],
  useAngle: true,
  angle: 90,
  angleCenter: { x: 0.1, y: 0.5 },
})`
  flex: 1;
  
`;

export const Header = styled.View`
  height: 110px
  width: 100%
  align-items: center
  justify-content: flex-end
  border-radius: 25px
  background: #302E44;
  margin-bottom: 10%
  padding-bottom: 5%
`;

export const CardsContainer = styled.View`
  flex: 1;
  padding: 5%
  padding-horizontal: 24px;
  background: #232131;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
`;
