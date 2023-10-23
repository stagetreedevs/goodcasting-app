import React, {createContext, useState, useEffect, useContext} from 'react';
import {useTranslation} from 'react-i18next';
import OneSignal from 'react-native-onesignal';
import Snackbar from '../components/Snackbar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {clientLogin, artistLogin, adjustCode} from '../providers/auth';
import {updateClient, updateArtist, getClient} from '../providers/client';
import {createJob} from '../providers/jobs';
import provider from '../providers/config';
import {useModal} from './modal';
import {getArtist, getArtistStatus} from '../providers/artist';

const AuthContext = createContext({
  signed: null,
  user: null,
  createClientJob: null,
  setJob: null,
  updateFirstLogin: null,
  updateClientUser: null,
  updateArtistUser: null,
  checkUserStatus: null,
  loading: null,
  signIn: null,
  signOut: null,
  retrieveUser: null,
  archiveChatMessage: null,
  archivedChatMessages: null,
  addLastMessage: null,
  lastMessages: null,
  updateMessages: null,
  setUpdateMessages: null,
});

let INTERV = null;

const AuthProvider = ({children}) => {
  const {t} = useTranslation('auth');
  const {openModal} = useModal();
  const [user, setUser] = useState(null);
  const [job, setJob] = useState(null);
  const [archivedChatMessages, setArchivedChatMessages] = useState([]);
  const [lastMessages, setLastMessages] = useState([]);
  const [updateMessages, setUpdateMessages] = useState(false);
  const [updateLastMessage, setUpdateLastMessage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [onesignalId, setOnesignalId] = useState('');

  useEffect(() => {
    if (archivedChatMessages.length > 0) {
      setUpdateMessages(true);
    }
  }, [archivedChatMessages]);

  useEffect(() => {
    if (lastMessages.length > 0 && updateLastMessage) {
      setUpdateMessages(true);
      setUpdateLastMessage(false);
    }
  }, [lastMessages, updateLastMessage]);

  const getStorageByUser = async (storageName, byUser, field) => {
    if (!byUser) return [];
    const storage = await AsyncStorage.getItem(storageName);

    if (storage) {
      const parsedStorage = JSON.parse(storage);
      let saved = [];
      for (const instance of parsedStorage) {
        if (
          instance.user_id === byUser.id &&
          instance.user_type === byUser.type
        ) {
          saved = instance[field];
          break;
        }
      }

      return saved;
    } else {
      return [];
    }
  };

  useEffect(() => {
    async function loadStorageData() {
      const storagedUser = await AsyncStorage.getItem('@GoodCasting:userInfo');
      const storagedJob = await AsyncStorage.getItem('@GoodCasting:job');

      if (storagedUser) {
        const storeUser = JSON.parse(storagedUser);
        setUser(storeUser);
        // console.log(storeUser);
        // provider.defaults.headers.Authorization = `Token ${storeUser.token}`;
        const archives = await getStorageByUser(
          '@GoodCasting:archivedChatMessages',
          storeUser,
          'rooms',
        );
        setArchivedChatMessages(archives);

        const lastMsgs = await getStorageByUser(
          '@GoodCasting:lastMessages',
          storeUser,
          'lastMessages',
        );
        setLastMessages(lastMsgs);

        if (storagedJob) {
          const storeJob = JSON.parse(storagedJob);
          if (job) {
            createClientJob(
              storeUser,
              {...storeJob, client: storeUser.id},
              false,
            );
          }
        }
      }

      setLoading(false);
    }

    async function loadOneSignalID() {
      const deviceState = await OneSignal.getDeviceState();
      if (deviceState) {
        setOnesignalId(deviceState.userId);
      }
    }

    loadOneSignalID();
    loadStorageData();
  }, []);

  // useEffect(() => {
  //   INTERV = setInterval(() => {
  //     if (user && user.type === 'Cliente') {
  //       getClientData();
  //     }
  //   }, 30000);
  //   return () => clearInterval(INTERV);
  // }, []);

  const handleSetJob = async job => {
    setJob(job);
    await AsyncStorage.setItem('@GoodCasting:job', JSON.stringify(job));
  };

  async function signIn(payload, type) {
    try {
      let response;

      if (type === 'Cliente') {
        response = await clientLogin(payload);
        if (response.status === 'REJEITADO') {
          return Snackbar.show({
            text: t('accountReject'),
            duration: Snackbar.LENGTH_LONG,
          });
        }
        //set onesignal id
        let _onesginal = '';
        if(onesignalId) {
          _onesginal = onesignalId;
        } else {
          const device = await OneSignal.getDeviceState();
          if(device) {
            _onesginal = device.userId;
          }
        }
        updateClient(response.id, {onesignal_id: _onesginal}, response.token);
      } else {
        response = await artistLogin(payload);
        //set onesignal id
        let _onesginal = '';
        if(onesignalId) {
          _onesginal = onesignalId;
        } else {
          const device = await OneSignal.getDeviceState();
          if(device) {
            _onesginal = device.userId;
          }
        }
        updateArtist(response.id, {onesignal_id: _onesginal}, response.token);
      }
      const usResp = {
        ...response,
        type,
      };
      setUser(usResp);
      // provider.defaults.headers.Authorization = `Token ${response.token}`;

      await AsyncStorage.setItem('@GoodCasting:userInfo', JSON.stringify(usResp));

      const archives = await getStorageByUser(
        '@GoodCasting:archivedChatMessages',
        usResp,
        'rooms',
      );
      setArchivedChatMessages(archives);

      const lastMsgs = await getStorageByUser(
        '@GoodCasting:lastMessages',
        usResp,
        'lastMessages',
      );
      setLastMessages(lastMsgs);
      if (job) {
        createClientJob(response, {...job, client: response.id}, false);
      }
    } catch (err) {
      return Snackbar.show({
        text: t('loginError'),
        duration: Snackbar.LENGTH_LONG,
      });
    }
  }

  async function updateFirstLogin(payload) {
    try {
      const response = await adjustCode(payload);
      setUser({
        ...response,
        type: user.type,
      });

      await AsyncStorage.setItem(
        '@GoodCasting:userInfo',
        JSON.stringify({
          ...response,
          type: user.type,
        }),
      );
    } catch (err) {
      return Snackbar.show({
        text: t('codeError'),
        duration: Snackbar.LENGTH_LONG,
      });
    }
  }

  async function updateClientUser(payload) {
    try {
      const response = await updateClient(user.id, payload, user.token);
      setUser({
        ...response,
        type: user.type,
      });

      await AsyncStorage.setItem(
        '@GoodCasting:userInfo',
        JSON.stringify({
          ...response,
          type: user.type,
        }),
      );

      Snackbar.show({
        text: t('infoSuccess'),
        duration: Snackbar.LENGTH_LONG,
      });
      return response;
    } catch (err) {
      return Snackbar.show({
        text: t('infoError'),
        duration: Snackbar.LENGTH_LONG,
      });
    }
  }

  async function archiveChatMessage(roomId, message) {
    const newArchivedChatMessages = [];
    let found = false;
    for (const chat of archivedChatMessages) {
      if (chat.room === roomId) {
        found = true;
        newArchivedChatMessages.push({
          ...chat,
          messages: [...chat.messages, message],
        });
      } else {
        newArchivedChatMessages.push(chat);
      }
    }

    if (!found) {
      newArchivedChatMessages.push({
        room: roomId,
        messages: [message],
      });
    }

    const storagedArchivedChatMessages = await AsyncStorage.getItem(
      '@GoodCasting:archivedChatMessages',
    );

    if (storagedArchivedChatMessages) {
      const storeArchivedChatMessages = JSON.parse(
        storagedArchivedChatMessages,
      );
      const hasUser = storeArchivedChatMessages.filter(
        arc => arc.user_id === user.id && arc.user_type === user.type,
      )[0];

      if (hasUser) {
        const newArchives = storeArchivedChatMessages.map(arc => {
          if (arc.user_id === user.id && arc.user_type === user.type) {
            return {
              ...arc,
              rooms: newArchivedChatMessages,
            };
          } else {
            return arc;
          }
        });
        await AsyncStorage.setItem(
          '@GoodCasting:archivedChatMessages',
          JSON.stringify(newArchives),
        );
      } else {
        const newArchive = {
          user_id: user.id,
          user_type: user.type,
          rooms: newArchivedChatMessages,
        };
        await AsyncStorage.setItem(
          '@GoodCasting:archivedChatMessages',
          JSON.stringify([...storeArchivedChatMessages, newArchive]),
        );
      }
    } else {
      const newArchive = {
        user_id: user.id,
        user_type: user.type,
        rooms: newArchivedChatMessages,
      };
      // console.log(newArchive);
      await AsyncStorage.setItem(
        '@GoodCasting:archivedChatMessages',
        JSON.stringify([newArchive]),
      );
    }

    setArchivedChatMessages(newArchivedChatMessages);
  }

  async function addLastMessage(roomId, message, updateChat = false) {
    const newLastMessages = [];
    let found = false;
    for (const chat of lastMessages) {
      if (chat.room === roomId) {
        found = true;
        newLastMessages.push({
          ...chat,
          message,
        });
      } else {
        newLastMessages.push(chat);
      }
    }

    if (!found) {
      newLastMessages.push({
        room: roomId,
        message,
      });
    }

    const storagedLastMessages = await AsyncStorage.getItem(
      '@GoodCasting:lastMessages',
    );

    if (storagedLastMessages) {
      const storeLastMessages = JSON.parse(storagedLastMessages);
      const hasUser = storeLastMessages.filter(
        arc => arc.user_id === user.id && arc.user_type === user.type,
      )[0];

      if (hasUser) {
        const newLastMessagesToSave = storeLastMessages.map(arc => {
          if (arc.user_id === user.id && arc.user_type === user.type) {
            return {
              ...arc,
              lastMessages: newLastMessages,
            };
          } else {
            return arc;
          }
        });
        await AsyncStorage.setItem(
          '@GoodCasting:lastMessages',
          JSON.stringify(newLastMessagesToSave),
        );
      } else {
        const newLastMessageUser = {
          user_id: user.id,
          user_type: user.type,
          lastMessages: newLastMessages,
        };
        await AsyncStorage.setItem(
          '@GoodCasting:lastMessages',
          JSON.stringify([...storeLastMessages, newLastMessageUser]),
        );
      }
    } else {
      const newLastMessageUser = {
        user_id: user.id,
        user_type: user.type,
        lastMessages: newLastMessages,
      };
      await AsyncStorage.setItem(
        '@GoodCasting:lastMessages',
        JSON.stringify([newLastMessageUser]),
      );
    }

    setLastMessages(newLastMessages);

    if (updateChat) {
      setUpdateLastMessage(true);
    }
  }

  async function updateArtistUser(payload) {
    try {
      const response = await updateArtist(user.id, payload, user.token);
      setUser({
        ...response,
        type: user.type,
      });
      await AsyncStorage.setItem(
        '@GoodCasting:userInfo',
        JSON.stringify({
          ...response,
          type: user.type,
        }),
      );
      Snackbar.show({
        text: t('infoSuccess'),
        duration: Snackbar.LENGTH_LONG,
      });
      return response;
    } catch (err) {
      return Snackbar.show({
        text: t('infoError'),
        duration: Snackbar.LENGTH_LONG,
      });
    }
  }

  async function checkUserStatus() {
    if (user) {
      if (user.type === 'Artista') {
        resp = await getArtistStatus(user.id, user.token);

        if (resp.response && resp.response.status === 403) {
          await AsyncStorage.setItem('@GoodCasting:userInfo', '');
          await AsyncStorage.setItem('@GoodCasting:job', '');

          setJob(null);
          setUser(null);
          return false;
        }
      }
    }
    return true;
  }

  async function retrieveUser() {
    if (user) {
      let response = null;
      if (user.type === 'Artista') {
        response = await getArtist(user.id, user.token);
      } else if (user.type === 'Cliente') {
        response = await getClient(user.id, user.token);
      }
      if (response) {
        setUser({
          ...user,
          ...response,
          type: user.type,
        });
        AsyncStorage.setItem(
          '@GoodCasting:userInfo',
          JSON.stringify({
            ...user,
            ...response,
            type: user.type,
          }),
        );
      }
    }
  }

  const createClientJob = async (client, payload, notification = true) => {
    try {
      await createJob(payload, client.token);
      if (notification) {
      console.log(payload);
      Snackbar.show({
          text: t('jobSuccess'),
          duration: Snackbar.LENGTH_LONG,
        });
      }

      if (job) {
        setJob(null);
        await AsyncStorage.removeItem('@GoodCasting:job');
      }

      return true;
    } catch (err) {
      console.log(payload);
      if (notification) {
        Snackbar.show({
          text: t('jobError'),
          duration: Snackbar.LENGTH_LONG,
        });
      }
      return false;
    }
  };

  async function signOut() {
    if (user.type === 'Cliente') {
     await updateClient(user.id, {onesignal_id: ''}, user.token);
    } else {
     await updateArtist(user.id, {onesignal_id: ''}, user.token);
    }

    await AsyncStorage.setItem('@GoodCasting:userInfo', '');
    await AsyncStorage.setItem('@GoodCasting:job', '');

    setJob(null);
    setUser(null);
  }

  // const getClientData = async () => {
  //   try {
  //     const result = await getClient(user.id, user.token);
  //     setUser({...user, ...result});
  //   } catch (err) {}
  // };

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        createClientJob,
        setJob: handleSetJob,
        updateFirstLogin,
        updateClientUser,
        updateArtistUser,
        checkUserStatus,
        loading,
        signIn,
        signOut,
        retrieveUser,
        archiveChatMessage,
        archivedChatMessages,
        updateMessages,
        setUpdateMessages,
        addLastMessage,
        lastMessages,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.');
  }

  return context;
}

export {AuthProvider, useAuth};
