import styled from 'styled-components/native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {theme} from '../../constants/theme';

export const Container = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
`;

export const Button = styled.TouchableOpacity`
  width: 36px;
  justify-content: center;
  align-items: center;
`;

export const Icon = styled(AntDesign)`
  color: ${theme.tagText};
`;
