import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-bottom: 64px;
`;

export const PhotoButton = styled.TouchableOpacity`
  margin-bottom: 15px;
`;

export const Photo = styled.Image`
  width: 130px;
  height: 284px;
`;
