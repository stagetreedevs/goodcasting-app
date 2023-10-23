import styled from 'styled-components/native';

import {theme} from '../../constants/theme';

export const Container = styled.View`
  background-color: #232131;
  border-top-right-radius: 20px;
`;

export const Logo = styled.Image`
  width: 80px;
  height: 36px;
  resize-mode: contain;
`;

export const OptionsContainer = styled.View`
padding: 36px

`;

export const Option = styled.TouchableOpacity`
  margin-bottom: 16px;
`;

export const BottomContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 32px;
`;