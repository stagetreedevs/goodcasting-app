import styled from 'styled-components/native';

import {theme} from '../../constants/theme';

export const Container = styled.View`
  width: 100%;
  border-radius: ${props =>
    props.client || props.artistInJob ? '10px' : '0px'};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-vertical: 6px;
`;

export const InformationContainer = styled.TouchableOpacity`
  width: ${props => props.width};
  height: 100%
  padding: 0
`;
export const InformationContainerBody = styled.View`
  width: ${props => props.width};
`;
export const TagContainer = styled.TouchableOpacity`
  background-color: ${props => theme.tagColor[props.status]};
  align-self: center;
  border-radius: 3px;
  padding-vertical: 3px;
  width: 100%;
`;

export const TagText = styled.Text`
  color: ${theme.primaryTextColor};
  font-size: 10px;
  font-weight: 500;
  text-transform: uppercase;
  text-align: center;
`;

export const ActionContainer = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const ActionButton = styled.TouchableOpacity`
  width: 32px;
  height: 32px;
  background-color: ${props => props.background};
  justify-content: center;
  align-items: center;
  border-radius: 16px;
`;

export const ClientActionContainer = styled.View`
  width: 100px;
  height: 60px;
  justify-content: ${props => (props.twoOptions ? 'space-between' : 'center')};
  padding: 6px
`;
