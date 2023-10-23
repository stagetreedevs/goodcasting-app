/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useRef} from 'react';
import {View, StyleSheet, Platform, Alert} from 'react-native';
import {useTranslation} from 'react-i18next';
import Snackbar from '../../components/Snackbar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {format} from 'date-fns';
import {
  Container,
  MessagesContainer,
  MessageContainer,
  Message,
  MessageText,
  MessageTime,
  InputContainer,
  Input,
  InputButton,
  UnreadMessages,
  UnreadMessagesText,
} from './styles';

import Paragraph from '../../components/Paragraph';
import HeaderWithLogo from '../../components/HeaderWithLogo';

import {useAuth} from '../../contexts/auth';
import {useModal} from '../../contexts/modal';
import {getChatHistory} from '../../providers/chat';
import {socket, leaveRoom, addMessage} from '../../providers/socket';
import {theme} from '../../constants/theme';

const Chat = ({route, navigation}) => {
  const {openModal} = useModal();
  const {t} = useTranslation('chat');
  const {
    user,
    archiveChatMessage,
    archivedChatMessages,
    updateMessages,
    setUpdateMessages,
    lastMessages,
    addLastMessage,
  } = useAuth();
  const chatContent = useRef(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  useEffect(() => {
    if (!route.params) {
      return navigation.goBack();
    }

    getMessages();
    return () => leaveRoom(route.params.room_info.room_id);
  }, []);

  useEffect(() => {
    if (updateMessages) {
      getMessages();
    }
  }, [updateMessages]);

  useEffect(() => {
    socket.on('message', message => {
      const { room_info } = route.params;
      
      if(room_info.room_id === message.room_id.room_id){
        setMessages(currentMessages => [...currentMessages, message]);
      }
      if (message.from === user.email) {
        addLastMessage(route.params.room, message);
      }
    });
  }, []);

  const messagesAreEqual = (message, otherMessage) => {
    if (
      otherMessage.created !== message.created ||
      otherMessage.text !== message.text ||
      otherMessage.from !== message.from ||
      otherMessage.type !== message.type
    ) {
      return false;
    } else {
      return true;
    }
  };

  const onlyInLeft = (left, right, compareFunction) =>
    left.filter(
      leftValue =>
        !right.some(rightValue => compareFunction(leftValue, rightValue)),
    );

  const getSetWithLastMessage = (set, lastMessage) => {
    const withLastMessage = [];
    let labelAdded = false;
    for (let i = 0; i < set.length; i++) {
      const message = set[i];
      if (messagesAreEqual(message, lastMessage)) {
        if (i !== set.length - 1) {
          withLastMessage.push(message);
          withLastMessage.push({
            type: 'unread',
            count: set.length - i - 1,
          });
          labelAdded = true;
        } else {
          withLastMessage.push(message);
        }
      } else {
        withLastMessage.push(message);
      }
    }
    return {withLastMessage, labelAdded};
  };

  const getMessages = async () => {
    try {
      const checkLastMessage = lastMessages.filter(
        chat => chat.room === route.params.room,
      )[0];

      let lastMessage = null;

      if (checkLastMessage) {
        if (checkLastMessage.message) {
          lastMessage = checkLastMessage.message;
        }
      }
      const result = await getChatHistory(route.params.room, '');
      if (archivedChatMessages && archivedChatMessages.length > 0) {
        const messagesToFilter = archivedChatMessages.filter(
          chat => chat.room === route.params.room,
        )[0];

        if (messagesToFilter && messagesToFilter.messages.length > 0) {
          const filtered = onlyInLeft(
            result.sortedList,
            messagesToFilter.messages,
            messagesAreEqual,
          );
          if (!lastMessage) {
            setMessages([...filtered]);
            addLastMessage(route.params.room, filtered[filtered.length - 1]);
          } else {
            const {withLastMessage, labelAdded} = getSetWithLastMessage(
              filtered,
              lastMessage,
            );
            setMessages([...withLastMessage]);
            if (labelAdded) {
              setTimeout(() => {
                addLastMessage(
                  route.params.room,
                  withLastMessage[withLastMessage.length - 1],
                  true,
                );
              }, 5000);
            }
          }
        } else {
          if (!lastMessage) {
            setMessages([...result.sortedList]);
            addLastMessage(
              route.params.room,
              result.sortedList[result.sortedList.length - 1],
            );
          } else {
            const {withLastMessage, labelAdded} = getSetWithLastMessage(
              result.sortedList,
              lastMessage,
            );
            setMessages([...withLastMessage]);
            if (labelAdded) {
              setTimeout(() => {
                addLastMessage(
                  route.params.room,
                  withLastMessage[withLastMessage.length - 1],
                  true,
                );
              }, 5000);
            }
          }
        }
      } else {
        if (!lastMessage) {
          setMessages([...result.sortedList]);
          addLastMessage(
            route.params.room,
            result.sortedList[result.sortedList.length - 1],
          );
        } else {
          const {withLastMessage, labelAdded} = getSetWithLastMessage(
            result.sortedList,
            lastMessage,
          );
          setMessages([...withLastMessage]);
          if (labelAdded) {
            setTimeout(() => {
              addLastMessage(
                route.params.room,
                withLastMessage[withLastMessage.length - 1],
                true,
              );
            }, 5000);
          }
        }
      }

      if (updateMessages) {
        setUpdateMessages(false);
      }
    } catch (err) {
      return Snackbar.show({
        text: t('messagesError'),
        duration: Snackbar.LENGTH_LONG,
      });
    }
  };

  const doArchiveMessage = item => {
    archiveChatMessage(route.params.room_info.room_id, item);
  };

  // const archiveModal = item => {
  //   return Alert.alert(t('archiveTitle'), t('archiveMessage'), [
  //     {
  //       text: t('cancel'),
  //       style: 'cancel',
  //     },
  //     {text: 'OK', onPress: () => doArchiveMessage(item)},
  //   ]);
  // };

  const handleSubmit = () => {
    setLoadingSubmit(true);

    if (newMessage.trim().length === 0) {
      setLoadingSubmit(false);
      return Snackbar.show({
        text: t('validMessageError'),
        duration: Snackbar.LENGTH_LONG,
      });
    }

    const message = {
      text: newMessage,
      type: 'text',
      room_info: route.params.room_info,
      current_user: user.email,
      current_user_id: user.id,
    };

    addMessage(message);
    setNewMessage('');

    setLoadingSubmit(false);
  };

  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : ''}>
      <HeaderWithLogo withGoBack />
      <Paragraph style={styles.title} type="title" alignment="center">
        {t('chattingWith')} {route.params.otherUser.user_name ? route.params.otherUser.user_name : route.params.otherUser.name}
      </Paragraph>
      <MessagesContainer
        ref={chatContent}
        onContentSizeChange={() =>
          chatContent.current.scrollToEnd({animated: true})
        }
        showsVerticalScrollIndicator={false}>
        {messages.map((message, index) => {
          if (message.type && message.type === 'unread') {
            return (
              <UnreadMessages>
                <UnreadMessagesText>
                  {message.count}{' '}
                  {message.count > 1
                    ? t('notReadMessagesPlural')
                    : t('notReadMessagesSingular')}
                </UnreadMessagesText>
              </UnreadMessages>
            );
          } else {
            return (
              <MessageContainer
                key={index}
                // onLongPress={() => archiveModal(message)}
                >
                <Message
                  type={user.email === message.from ? 'sender' : 'receiver'}>
                  <MessageText>{message.text}</MessageText>
                </Message>
                <MessageTime
                  type={user.email === message.from ? 'sender' : 'receiver'}>
                  {format(new Date(message.created), 'dd/MM/yyyy HH:mm')}
                </MessageTime>
              </MessageContainer>
            );
          }
        })}
      </MessagesContainer>
      <InputContainer>
        <Input
          style={styles.input}
          value={newMessage}
          onChangeText={text => setNewMessage(text)}
          placeholder={t('inputPlaceholder')}
          placeholderTextColor={theme.mutedText}
          multiline
        />
        <InputButton disabled={loadingSubmit} onPress={handleSubmit}>
          <Ionicons name="send" size={22} color={theme.primaryTextColor} />
        </InputButton>
      </InputContainer>
      {Platform.OS === 'ios' && <View style={{height: 30}} />}
    </Container>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 12,
    marginVertical: 19,
  },
  card: {
    marginBottom: 16,
  },
  lastCard: {
    marginBottom: 64,
  },
});

export default Chat;
