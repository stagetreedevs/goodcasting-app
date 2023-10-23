import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {Container, Logo} from './styles';

import Button from '../Button';

import LogoImage from '../../../assets/images/logo.png';

import {theme} from '../../constants/theme';

const HeaderWithLogo = ({
  withGoBack = false,
  customGoBack = null,
  ...props
}) => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    if (customGoBack !== null) return customGoBack();
    return navigation.goBack();
  };

  return (
    <Container {...props}>
      {withGoBack ? (
        <Button style={styles.button} type="link" onPress={handleGoBack}>
          <Ionicons
            name="arrow-back-outline"
            color={theme.primaryTextColor}
            size={28}
          />
        </Button>
      ) : (
        <Text />
      )}
      <Logo source={LogoImage} />
    </Container>
  );
};

const styles = StyleSheet.create({
  button: {
    alignSelf: 'flex-start',
    height: 36,
  },
});

export default HeaderWithLogo;
