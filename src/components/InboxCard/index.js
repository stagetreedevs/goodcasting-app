/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import Snackbar from '../Snackbar';
import {useNavigation} from '@react-navigation/native';
import {
  Container,
  InformationContainer,
  Name,
  Description,
  NotificationTag,
  NotificationTagText,
} from './styles';

import {getArtist} from '../../providers/artist';
import {getJobInvite} from '../../providers/jobs';
import {enterRoom} from '../../providers/socket';
import {useAuth} from '../../contexts/auth';
import {useModal} from '../../contexts/modal';
import {useNotification} from '../../contexts/notification';

const InboxCard = ({chat, ...props}) => {
  const navigation = useNavigation();
  const {notifications, newNotification} = useNotification();
  const {user} = useAuth();
  const {openModal} = useModal();
  const [job, setJob] = useState(null);
  const [users, setUsers] = useState(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    getSolicitation();
  }, []);

  useEffect(() => {
    getCountNotification();
  }, [notifications])

  // useEffect(() => {
  //   if (job && users && user.type === 'Cliente') {
  //     const names = users.map(chatUser => chatUser.name);
  //     const notification = notifications.filter(
  //       notif => notif.job === job.category && names.includes(notif.user),
  //     )[0];
  //     if (notification) {
  //       setCount(notification.count);
  //     }
  //   } else if (job && user.type === 'Artista') {
  //     const notification = notifications.filter(
  //       notif => notif.job === job.category && notif.user === job.client.name,
  //     )[0];
  //     if (notification) {
  //       setCount(notification.count);
  //     }
  //   }
  // }, [notifications, job, users]);

  const getSolicitation = async () => {
    try {
      const result = chat.invites;
      setJob(chat.job);
      setUsers(result);
    } catch (err) {}
  };

  const handleGoToChat = () => {
    // if (job && users && user.type === 'Cliente') {
    //   const names = users.map(chatUser => chatUser.name);
    //   const newNotifications = notifications.filter(
    //     notif => notif.job !== job.category || !names.includes(notif.user),
    //   );
    //   newNotification(newNotifications);
    // } else if (job && user.type === 'Artista') {
    //   const newNotifications = notifications.filter(
    //     notif => notif.job !== job.category && notif.user !== job.client.name,
    //   );
    //   newNotification(newNotifications);
    // }
    navigation.navigate('ChatJobs', {
      chat,
      users: users,
      // users: user.type === 'Cliente' ? users : [{user_id: chat.client_id, user_name: chat.client_name}],
      job: job ? job : {category: ''},
    });
  };

  const getCountNotification = () => {
    const count = notifications.reduce((preValue, currValue) => {
      if(currValue.job === chat.category) {
        const findUser = chat.invites.find(inv => inv.user_name === currValue.user);
        if(findUser) {
          return preValue + currValue.count;
        }
        return preValue;
      } else {
        return preValue;
      }
    }, 0);
    setCount(count);
  }

  // if (!job) return <></>;

  return (
    <Container onPress={handleGoToChat} {...props}>
      <InformationContainer>
        <Name>{chat ? chat.category : 'Job'}</Name>
        <Description ellipsizeMode="tail" numberOfLines={1}>
          {chat ? chat.description : ''}
        </Description>
      </InformationContainer>
      {count > 0 && (
        <NotificationTag>
          <NotificationTagText>{count}</NotificationTagText>
        </NotificationTag>
      )}
    </Container>
  );
};

export default InboxCard;
