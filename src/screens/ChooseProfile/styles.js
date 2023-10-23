import styled from 'styled-components/native';
import {Dimensions} from 'react-native';
import BackgroundImage from "../../../assets/images/chooseprofile.png";

const screen = Dimensions.get('screen');

export const BackgroundContainer = styled.View`
  width: ${screen.width}px;
  height: ${screen.height}px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  opacity: 1;
`;

export const Background = styled.Image`
  width: 100%;
  height: 100%;
  resize-mode: cover;
`;

export const Container = styled.View`
  width: 100%;
  height: 100%;
  justify-content: flex-end;
  background: #e5e5e5
`;
export const ButtonContainer = styled.View`
  width: 100%;
  height: 35%;
  min-height: 250px
  background: #ffffff99
  border: 2px solid #cccccc99
  box-shadow: 10px 10px 10px rgba(30,30,30,0.5);
  border-top-left-radius: 25px
  border-top-right-radius: 25px
  backdrop-filter: blur(50px); 
`;
export const Header = styled.View`
  width: 100%;
  height: 80px;
  position: absolute;
  top: 2.5%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px 0 16px;
`;
