import styled from 'styled-components/native';

import {theme} from '../../constants/theme';

export const Container = styled.Text`
  font-size: ${props => props.fontSize};
  font-weight: ${props => props.fontWeight};
  text-align: ${props => props.alignment};
  color: ${props => (props.muted ? theme.mutedText : theme.primaryTextColor)};
`;

export const Required = styled.Text`
  color: red;
`;
