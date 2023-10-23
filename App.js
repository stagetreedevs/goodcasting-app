import 'react-native-gesture-handler';
import React, { Suspense, useEffect} from 'react';
import { ActivityIndicator, StyleSheet, LogBox, SafeAreaView, Platform} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import OneSignal from 'react-native-onesignal';
import FlashMessage from 'react-native-flash-message';
import Routes from './src/navigation';
import { StatusBar } from 'native-base';
import {AuthProvider} from './src/contexts/auth';
import {ModalProvider} from './src/contexts/modal';
import {useNotification} from './src/contexts/notification';
import {theme} from './src/constants/theme';
import './src/locales';

LogBox.ignoreAllLogs();

const App = () => {
  const {newNotification, notifications} = useNotification();
  OneSignal.setLogLevel(6, 0);
  OneSignal.setAppId('4a66b6d3-7695-4a9d-a94d-c7a2420f0b6f');

  OneSignal.promptForPushNotificationsWithUserResponse(response => {
    console.log('Prompt response:', response);
  });

  OneSignal.setNotificationWillShowInForegroundHandler(
    notificationReceivedEvent => {
      console.log(
        'OneSignal: notification will show in foreground:',
        notificationReceivedEvent,
      );
      let notification = notificationReceivedEvent.getNotification();
      handleNewNotification(notification.body);

      notificationReceivedEvent.complete(notification);
    },
  );

  OneSignal.setNotificationOpenedHandler(notification => {
    console.log('OneSignal: notification opened:', notification);
  });

  useEffect(() => {
    SplashScreen.hide();
  });

  const handleNewNotification = body => {
    try {
      const user = body.match(/from(.*?)about/)[1].trim();
      const job = body.match(/job(.*?)\./)[1].trim();
      let added = false;
  
      let newNotifications = notifications.map(notification => {
        if (notification.user === user && notification.job === job) {
          added = true;
          return {...notification, count: notification.count + 1};
        } else {
          return notification;
        }
      });
  
      if (!added) {
        const notification = {
          user,
          job,
          count: 1,
        };
  
        newNotifications = [...notifications, notification];
      }
  
      newNotification(newNotifications);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {Platform.OS === 'ios' && <StatusBar barStyle={'light-content'}/> }
      <Suspense fallback={<ActivityIndicator />}>
        <ModalProvider>
          <AuthProvider>
            <Routes />
          </AuthProvider>
        </ModalProvider>
      </Suspense>
      <FlashMessage
        position="top"
        style={{backgroundColor: theme.primaryColor}}
        textStyle={{color: theme.primaryTextColor}}
        titleStyle={{color: theme.primaryTextColor}}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#000000'
  },
});

export default App;
