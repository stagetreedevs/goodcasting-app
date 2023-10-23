import styled from 'styled-components/native';

import {theme} from '../../constants/theme';

export const Container = styled.KeyboardAvoidingView`
  width: 100%;
  height: 100%;
  background-color: ${theme.backgroundColor};
  padding-top: 24px;
  padding-horizontal: 24px;
  padding-bottom: 24px;
`;

export const MessagesContainer = styled.ScrollView``;
export const MessageContainer = styled.TouchableOpacity``;

export const Message = styled.View`
  background-color: ${theme.receiverMessageBackground};
  align-self: flex-start;
  padding-horizontal: 18px;
  padding-vertical: 10px;
  max-width: 80%;
  ${props =>
    props.type === 'sender'
      ? `
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    background-color: ${theme.senderMessageBackground};
    align-self: flex-end;
  `
      : `
    border-top-right-radius: 20px;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
  `}
`;

export const MessageText = styled.Text``;
export const MessageTime = styled.Text`
  margin-top: 8px;
  font-size: 10px;
  color: ${theme.mutedText};
  align-self: ${props => (props.type === 'sender' ? 'flex-end' : 'flex-start')};
  margin-bottom: 16px;
`;

export const InputContainer = styled.View`
  width: 100%;
  min-height: 48px;
  background-color: ${theme.cardBackground};
  border-radius: 40px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4px;
`;

export const Input = styled.TextInput`
  width: 80%;
  min-height: 30px;
  border-top-left-radius: 40px;
  border-bottom-left-radius: 40px;
  padding-horizontal: 16px;
  padding-vertical: 12px;
  color: ${theme.primaryTextColor};
`;

export const InputButton = styled.TouchableOpacity`
  width: 48px;
  height: 48px;
  border-radius: 23px;
  justify-content: center;
  align-items: center;
  background-color: ${theme.primaryColor};
`;

export const UnreadMessages = styled.View`
  padding: 8px;
  background-color: ${theme.primaryOpacity};
  align-self: center;
  margin-bottom: 8px;
  border-radius: 4px;
`;

export const UnreadMessagesText = styled.Text`
  color: ${theme.primaryTextColor};
`;