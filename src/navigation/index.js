import React from 'react';
import {SafeAreaView, StyleSheet, View, ActivityIndicator} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import UnauthRoutes from './unauth';
import AuthRoutes from './auth';

import {useAuth} from '../contexts/auth';
import {theme} from '../constants/theme';

const Routes = () => {
  const {signed, loading} = useAuth();

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={theme.primaryColor} />
      </View>
    );
  }

  if (signed) {
    return (
      <NavigationContainer>
        <AuthRoutes />
      </NavigationContainer>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <NavigationContainer>
        <UnauthRoutes />
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  safeArea: {
    flex: 1,
  },
});

export default Routes;
