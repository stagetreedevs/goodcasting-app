import styled from 'styled-components/native';

import {theme} from '../../constants/theme';

export const Container = styled.View`
  width: 47.5%;
  height: 300px;
  border-radius: 5px;
  border-width: 1px;
  border-color: ${theme.primaryColor};
`;

export const ArtistButton = styled.TouchableOpacity``;

export const ArtistImage = styled.Image`
  width: 100%;
  height: 250px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;

export const SelectContainer = styled.TouchableOpacity`
  top: -1px;
  width: 100%;
  height: 50px;
  padding-horizontal: 10px;

  flex-direction: row;
  align-items: center;
`;
