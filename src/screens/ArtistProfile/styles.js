import styled from 'styled-components/native';

import {theme} from '../../constants/theme';
import LinearGradient from "react-native-linear-gradient";
import Paragraph from '../../components/Paragraph';

export const Container = styled(LinearGradient).attrs({
  colors: ["#3AB5EA", "#34B797"],
  useAngle: true,
  angle: 90,
  angleCenter: { x: 0.1, y: 0.5 },
})`
  flex: 1;
`;

export const Header = styled.View`
  align-items: center;
  justify-content: center;
  width: 100%;
`;
export const PhotoContainer = styled.View`
  position: relative;
  z-index: 2;
  top: 60px;
  justify-content: center;
  align-items: center;
  elevation: 10;
`;


export const ProfileImage = styled.Image`
  width: 120px;
  height: 120px;
  border-radius: 60px;
`;
export const HeaderInformation = styled.View`
  width: 90%;
  height: 95px
  border-radius: 25px
  background: #302E44;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 5%
  margin-bottom: 16px;
`;

export const TagContainer = styled.View`
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const StarsContainer = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  margin-top: 8px;
`;

export const ProfileInformation = styled.View`
  margin-top: 24px;
  margin-bottom: 18px;
  padding-horizontal: 24px;
`;

export const InformationTable = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;
export const InformationColumn = styled.View`
  
`;
export const InformationRow = styled.View`
  height: 20px;
  margin-vertical: 2px
  align-items: center;
  flex-direction: row;
  min-width: 40%
`;
export const InformationItem = styled.View`
  flex-direction: row;
  justify-content: flex-start;
`;
export const SocialInformation = styled.View`
  padding-horizontal: 12px;
`;

export const SocialRow = styled.View`
  flex-direction: row;
  align-items: center;
`;
export const ChoosePhotoButton = styled.TouchableOpacity`
  background-color: ${theme.primaryColor};
  width: 38px;
  height: 38px;
  border-radius: 19px;
  justify-content: center;
  align-items: center;

  position: absolute;
  bottom: 0;
  right: 35%;
`;
export const SocialButton = styled.TouchableOpacity`
  flex-direction: row;
  flex: 1;
  align-items: center;
  justify-content: ${(props) => (props.rigth ? "flex-end" : "flex-start")};
  height: 25px;
`;

export const Social = styled(Paragraph)`
  font-size: 10px;
  flex-wrap: wrap;
  overflow: visible;
`;
export const MessageButton = styled.TouchableOpacity`
  background-color: #00000000;
  width: 34px;
  height: 34px;
  border-radius: 17px;
  justify-content: center;
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