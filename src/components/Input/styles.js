import TextInputMask from 'react-native-masked-input';
import styled from 'styled-components/native';
import {theme} from '../../constants/theme';

export const Container = styled.View`
  min-height: ${props => (props.label ? '84px' : '58px')};
  width: ${props => (props.group ? '47.5%' : '100%')};
  justify-content: space-between;
  position: relative;
`;

export const InputContainer = styled.TextInput`
  ${props => (props.multiline ? 'min-height: 58px;' : 'height: 54px;')};
  width: 100%;
  border-radius: 10px;
  border-color: ${theme.inputBorderColor};
  border-width: 1px;
  padding-horizontal: 8px;
  color: #fff;
  padding-top: ${props => (props.multiline ? '8px' : '0px')};
  padding-bottom: ${props => (props.multiline ? '8px' : '0px')};
`;

export const InputMaskContainer = styled(TextInputMask)`
  ${props => (props.multiline ? 'min-height: 58px;' : 'height: 54px;')};
  width: 100%;
  border-radius: 10px;
  border-color: ${theme.inputBorderColor};
  border-width: 1px;
  padding-horizontal: 8px;
  color: #fff;
  padding-top: ${props => (props.multiline ? '8px' : '0px')};
  padding-bottom: ${props => (props.multiline ? '8px' : '0px')};
`;

export const Button = styled.TouchableOpacity`
  position: absolute;
  right: 8px;
  z-index: 2;
  height: 54px;
  justify-content: center;
  align-items: center;
`;
