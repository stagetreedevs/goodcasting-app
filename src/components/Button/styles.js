import styled from 'styled-components/native';
import {theme} from '../../constants/theme';

export const Container = styled.TouchableOpacity`
  background-color: ${props => props.background};
  justify-content: center;
  align-items: center;
  height: ${props => props.height};
  width: ${props => props.width};
  border-radius: ${props => props.borderRadius};
  align-self: ${props => props.alignSelf};
`;

export const ContainerText = styled.Text`
  color: ${props => props.color};
  opacity: ${props => (props.disabled ? '0.5' : '1')};
  font-size: ${props => props.fontSize};
  font-weight: ${props => props.fontWeight};
  text-transform: ${props => props.textTransform};
`;
