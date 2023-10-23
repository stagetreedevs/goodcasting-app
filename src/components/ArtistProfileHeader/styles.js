import styled from 'styled-components/native';

import {theme} from '../../constants/theme';

export const Container = styled.View`
  align-items: center;
  margin-bottom: 8px;
`;

export const PhotoContainer = styled.View`
  position: relative;
  margin-bottom: 16px;
`;

export const Photo = styled.Image`
  width: 150px;
  height: 150px;
  border-radius: 75px;
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
  right: 0;
`;
export const Information = styled.View`
  width: 90%;
  height: 95px
  border-radius: 25px
  background: #302E44;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 5%
  margin-bottom: 18px;
`;