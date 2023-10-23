/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {format, differenceInHours} from 'date-fns';
import {
  Container,
  Title,
  LastMessageContainer,
  LastMessageContent,
  LastMessageTime,
  PhotoContainer,
  Photo,
  InformationContainer,
} from './styles';
import { NotificationTag, NotificationTagText } from '../InboxCard/styles';

import Snackbar from '../Snackbar';

import {useAuth} from '../../contexts/auth';
import {useNotification} from '../../contexts/notification';
import {getJobInvite} from '../../providers/jobs';
import {getChat, getChatHistory} from '../../providers/chat';

const ChatJobCard = ({
  solicitation,
  room,
  user: chatUser,
  refresh,
  ...props
}) => {
  const {user, archivedChatMessages} = useAuth();
  const {notifications, newNotification} = useNotification();
  const {t} = useTranslation('chatJobCard');
  const [job, setJob] = useState(null);
  const [lastMessage, setLastMessage] = useState(null);
  const [artistImage, setArtistImage] = useState('');
  const [count, setCount] = useState(0);

  useEffect(() => {
    // getJob();
    if(refresh) {
      getLastMessage();
    }
  }, [refresh]);

  useEffect(() => {
    if (user.type === 'Cliente') {
      if (chatUser) {
        setArtistImage(chatUser.user_image);
      }
    }
  }, []);

  useEffect(() => {
    getCountNotification();
  }, [notifications])

  // const getJob = async () => {
  //   try {
  //     const result = await getJobInvite(solicitation.id, user.token);
  //     setJob(result.job);
  //   } catch (err) {
  //     return Snackbar.show({
  //       text: err.message,
  //       duration: Snackbar.LENGTH_LONG,
  //     });
  //   }
  // };

  // const messagesAreEqual = (message, otherMessage) => {
  //   if (
  //     otherMessage.created !== message.created ||
  //     otherMessage.text !== message.text ||
  //     otherMessage.from !== message.from ||
  //     otherMessage.type !== message.type
  //   ) {
  //     return false;
  //   } else {
  //     return true;
  //   }
  // };

  // const onlyInLeft = (left, right, compareFunction) =>
  //   left.filter(
  //     leftValue =>
  //       !right.some(rightValue => compareFunction(leftValue, rightValue)),
  //   );

  const getLastMessage = async () => {
    //room_id = client_id+artist_id+solicitation_id
    let room_id = '';
    if(user.type === 'Cliente') {
      room_id = `${user.id}${chatUser.user_id}${chatUser.id}`
    } else {
      room_id = `${chatUser.user_id}${user.id}${room.invites[0].id}`
    }
    try {
      const result = await getChatHistory(room_id, '');
      // if (archivedChatMessages && archivedChatMessages.length > 0) {
      //   const messagesToFilter = archivedChatMessages.filter(
      //     chat => chat.room === room.room_id,
      //   )[0];

      //   if (messagesToFilter && messagesToFilter.messages.length > 0) {
      //     const filtered = onlyInLeft(
      //       result.sortedList,
      //       messagesToFilter.messages,
      //       messagesAreEqual,
      //     );
      //     const chatLastMessage = filtered[filtered.length - 1];
      //     if (chatLastMessage) {
      //       updateLastMessage(chatLastMessage.created)
      //       setLastMessage(chatLastMessage);
      //     }
      //   } else {
      //     const chatLastMessage =
      //       result.sortedList[result.sortedList.length - 1];
      //     if (chatLastMessage) {
      //       updateLastMessage(chatLastMessage.created)
      //       setLastMessage(chatLastMessage);
      //     }
      //   }
      // } else {
        const chatLastMessage = result.sortedList[result.sortedList.length - 1];
        if (chatLastMessage) {
          setLastMessage(chatLastMessage);
        }
      // }
    } catch (err) {
      return Snackbar.show({
        text: err.message,
        duration: Snackbar.LENGTH_LONG,
      });
    }
  };

  const formatDate = date => {
    const difference = differenceInHours(new Date(), new Date(date));

    if (difference >= 24) {
      return format(new Date(date), 'dd/MM/yyyy');
    } else {
      return format(new Date(date), 'HH:mm');
    }
  };

  const getCountNotification = () => {
    const count = notifications.reduce((preValue, currValue) => {
      if(currValue.job === room.category) {
        if(currValue.user === chatUser.user_name){
          return preValue + currValue.count;
        }
        return preValue;
      } else {
        return preValue;
      }
    }, 0);
    setCount(count);
  }

  return (
    <Container {...props}>
      {user.type === 'Cliente' && (
        <PhotoContainer>
          <Photo source={{uri: artistImage}} />
        </PhotoContainer>
      )}
      <InformationContainer withPhoto={user.type === 'Cliente'}>
        <Title>{chatUser ? chatUser.user_name : 'Artist'}</Title>
        <LastMessageContainer>
          <LastMessageContent ellipsizeMode="tail" numberOfLines={1}>
            {lastMessage
              ? `${user.email === lastMessage.from ? `${t('you')}: ` : ''}${
                  lastMessage.text
                }`
              : t('noMessages')}
          </LastMessageContent>
          <LastMessageTime>
            {lastMessage ? formatDate(lastMessage.created) : ''}
          </LastMessageTime>
        </LastMessageContainer>
      </InformationContainer>
      {count > 0 && <NotificationTag>
        <NotificationTagText>{count}</NotificationTagText>
      </NotificationTag>}
    </Container>
  );
};

export default ChatJobCard;
