import styled from 'styled-components/native';
import {Dimensions} from 'react-native';

import {theme} from '../../constants/theme';

const screen = Dimensions.get('screen');

// export const Wrapper = styled.View`
//   position: relative;
// `;

// export const Container = styled.TouchableOpacity`
//   width: 100%;
//   flex-direction: row;
//   align-items: center;
//   justify-content: space-between;
//   padding-horizontal: 10px;
//   padding-vertical: 10px;

//   border-radius: 10px;
//   border-width: 1px;
//   border-color: ${theme.inputBorderColor};
// `;

// export const Label = styled.Text`
//   font-size: 14px;
//   color: ${theme.mutedText};
// `;

// export const OptionsContainer = styled.ScrollView`
//   display: ${props => (props.opened ? 'flex' : 'none')};
//   width: 95%;
//   max-height: 126px;
//   border-width: 1px;
//   border-color: ${theme.inputBorderColor};
//   align-self: center;
// `;

// export const OptionButton = styled.TouchableOpacity`
//   height: 42px;
//   padding: 8px;
//   justify-content: center;
//   border-bottom-width: 1px;
//   border-bottom-color: ${theme.inputBorderColor};
// `;

// export const OptionText = styled.Text`
//   font-size: 12px;
// `;

// export const Wrapper2 = styled.View`
//   position: relative;
// `;

// export const Container2 = styled.View`
//   width: 100%;
// `;

// export const Label2 = styled.Text`
//   font-size: 14px;
//   color: ${theme.mutedText};
//   margin-bottom: 16px;
// `;

// export const OptionsContainer2 = styled.ScrollView`
//   width: 100%;
//   align-self: center;
// `;

// export const OptionButton2 = styled.TouchableOpacity`
//   height: 50px;
//   padding: 8px;
//   flex-direction: row;
//   align-items: center;
//   justify-content: space-between;
//   background-color: ${props =>
//     props.selected ? theme.primaryOpacity : 'transparent'};
//   margin-bottom: 8px;
//   border-radius: 10px;
//   border-width: 1px;
//   border-color: ${props =>
//     props.selected ? 'transparent' : 'rgba(0, 0, 0, 0.05)'};
// `;

// export const OptionText2 = styled.Text`
//   font-size: 12px;
//   color: ${theme.primaryTextColor};
// `;

export const Wrapper = styled.View`
  position: relative;
`;

export const Container = styled.TouchableOpacity`
  width: 100%;
  height: 50px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-bottom-color: rgba(0, 0, 0, 0.05);
  z-index: 0;
`;

export const SelectedContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Label = styled.Text`
  font-size: 14px;
  color: ${theme.mutedText};
`;

export const OptionsContainerWrapper = styled.View`
  display: ${props => (props.opened ? 'flex' : 'none')};
  z-index: 1;
  width: ${screen.width}px;
  height: ${screen.height}px;
  top: -350px;
  left: -28px;
  background-color: rgba(0, 0, 0, 0.3);
  position: absolute;
  padding: 24px;
  justify-content: center;
`;
export const OptionsContainer = styled.View`
  display: ${props => (props.opened ? 'flex' : 'none')};
  background-color: ${theme.backgroundColor};
  border-radius: 10px;
  padding: 16px;
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
`;