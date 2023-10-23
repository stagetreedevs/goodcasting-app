/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useCallback} from 'react';
import {StyleSheet, RefreshControl} from 'react-native';
import {differenceInHours} from 'date-fns';
import {useTranslation} from 'react-i18next';
import {useIsFocused} from '@react-navigation/native';
import {Container} from './styles';

import {enterRoom} from '../../providers/socket';

import HeaderWithLogo from '../../components/HeaderWithLogo';
import Paragraph from '../../components/Paragraph';
import ChatJobCard from '../../components/ChatJobCard';

import {useAuth} from '../../contexts/auth';
import { getChatHistory } from '../../providers/chat';
import { useNotification } from '../../contexts/notification';

const ChatJobs = ({navigation, route}) => {
  const {chat, users, job} = route.params;
  const {user} = useAuth();
  const {notifications, newNotification} = useNotification();
  const {t} = useTranslation('chatJobs');
  const isFocused = useIsFocused();
  const [refreshing, setRefreshing] = useState(false);
  const [usersRoom, setUsersRoom] = useState(users ? users : [])

  useEffect(() => {
    onRefresh();
  }, [isFocused]);

  useEffect(() => {
    if (refreshing) {
      setRefreshing(false);
      getLastMessages();
    }
  }, [refreshing]);

  const getLastMessages = async () => {
    let newListChat = [];
    let promisses = [];
    usersRoom.forEach((element, index) => {
      let room_id = '';
      if(user.type === 'Cliente') {
        room_id = `${user.id}${element.user_id}${element.id}`;
      } else {
        room_id = `${element.user_id}${user.id}${element.id}`;
      }

      const _promisse = new Promise((resolver, reject) => {
        getChatHistory(room_id, '')
        .then(res => {
          const { sortedList } = res;
          const _lasMessage = sortedList[sortedList.length - 1];
          const _newRoom = {
            ...element,
            created: _lasMessage.created
          };
          newListChat.push(_newRoom);
          resolver();
        })
        .catch(e => {
          const _newRoom = {...element};
          newListChat.push(_newRoom);
          reject();
        });
      });
      promisses.push(_promisse);
    });

    const allSeatled = () => {
      return Promise.all(promisses.map(pro => pro
        .then(value => ({ state: 'fulfilled', value }))
        .catch(reason => ({ state: 'rejected', reason }))))
    }

    allSeatled().then(res => {
      newListChat.sort((a, b) => {
        if(!a.created) {
          return 1;
        } else if(!b.created) {
          return -1;
        }
        const aDate = new Date(a.created);
        const bDate = new Date(b.created);
        const res = aDate < bDate ? 1 : aDate > bDate ? -1 : 0;
        return res;
      });
      setUsersRoom(newListChat);
    }).catch(e => console.log(e));
  }

  const handleGoToChat = (solicitation, cardUser) => {
    removeNotifications(cardUser);
    if (user.type === 'Cliente') {
      const room_id = `${user.id}${cardUser.user_id}${cardUser.id}`;
      const room_infor = {
        solicitation_id: cardUser.id,
        user_room: cardUser.user_id,
        user_room_name: cardUser.user_name,
        user_host_room: user.id,
        user_host_room_name: user.name,
        user_host_room_id: user.id,
        room_id: room_id
      }
      enterRoom(room_infor);
      navigation.navigate('Chat', {
        room_info: room_infor,
        room: room_id,
        otherUser: {...cardUser},
      });
    } else {
      const room_id = `${chat.client_id}${user.id}${chat.invites[0].id}`;
      const room_infor = {
        solicitation_id: cardUser.id,
        user_room: user.id,
        user_room_name: user.name,
        user_host_room: cardUser.user_id,
        user_host_room_name: cardUser.user_name,
        user_host_room_id: cardUser.user_id,
        room_id: room_id
      }
      enterRoom(room_infor);
      navigation.navigate('Chat', {
        room_info: room_infor,
        room: room_id,
        otherUser: {...cardUser}
      });
    }
  };

  const removeNotifications = (chatUser) => {
    const _newNotifications = [...notifications];
    const index = notifications.findIndex((item) => {
      return item.job === chat.category && item.user === chatUser.user_name
    });
    if(index > -1) {
      _newNotifications.splice(index, 1);
      newNotification(_newNotifications);
    }
  }

  const renderCard = (cardUser, index) => {
    return (
      <ChatJobCard
        key={`${user.id}${cardUser.user_id}${cardUser.id}`}
        refresh={refreshing}
        solicitation={chat.solicitation}
        room={chat}
        user={user.type === 'Cliente' ? cardUser : {...cardUser, id: chat.id}}
        onPress={() => handleGoToChat(chat.solicitation, cardUser)}
        style={index === users.length - 1 ? styles.lastCard : styles.card}
      />
    );
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
  }, []);

  return (
    <Container
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={() => setRefreshing(true)} />
      }>
      <HeaderWithLogo withGoBack />
      <Paragraph style={styles.title} type="title">
        {t('title')} "{chat.category}"
      </Paragraph>
      {usersRoom.map((user, index) => renderCard(user, index))}
    </Container>
  );
};

const styles = StyleSheet.create({
  title: {
    marginVertical: 19,
    fontSize: 28,
  },
  card: {
    marginBottom: 16,
  },
  lastCard: {
    marginBottom: 64,
  },
});

export default ChatJobs;