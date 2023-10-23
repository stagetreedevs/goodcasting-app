import styled from 'styled-components/native';

import {theme} from '../../constants/theme';

export const Wrapper = styled.View`
  position: absolute;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  padding-horizontal: 24px;
  padding-top: 24px;
  padding-bottom: 64px;
  justify-content: center;
`;

export const WrapperButton = styled.TouchableOpacity`
  position: absolute;
  top: 0;
  left: 0;
  z-index: -2;
  background-color: ${theme.wrapperBackground};
  width: ${props => props.width}px;
  height: ${props => props.height}px;
`;

export const Container = styled.View`
  background-color: #232131;
  width: 100%;
  height: auto;
  border-radius: 30px;
`;

export const Header = styled.View`
  width: 100%;
  min-height: 120px;
  justify-content: center;
  align-items: center;
  background-color: ${theme.primaryOpacity};
  padding: 30px;
  border-radius: 30px;
`;

export const HeaderButton = styled.TouchableOpacity`
  width: 44px;
  height: 44px;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 10px;
  right: 20px;
  z-index: 3;
`;

export const Content = styled.View`
  width: 100%;
  padding: 30px;
`;

export const ContentRow = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
`;
export const Field = styled.View`
  width: ${props => (props.row ? '50%' : '100%')};
  flex-direction: column;
  margin-bottom: 15px;
`;

export const Label = styled.Text`
  font-size: 14px;
  color: ${theme.tagText};
`;

export const OptionButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding-vertical: 12px;
  ${props => (props.first ? 'margin-top: 8px;' : '')};
  border-bottom-width: ${props => (props.lastOne ? '0px' : '1px')};
  border-bottom-color: rgba(0, 0, 0, 0.05);
`;

export const OptionText = styled.Text`
  font-size: 12px;
  margin-left: 8px;
  color: ${theme.tagText};
`;