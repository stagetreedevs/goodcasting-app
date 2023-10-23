import React, {useState, useEffect} from 'react';
import {StyleSheet, Dimensions, View} from 'react-native';
import {
  Wrapper,
  Container,
  Header,
  HeaderButton,
  Content,
  ContentRow,
  Field,
} from './styles';

import Ionicons from 'react-native-vector-icons/Ionicons';

import Paragraph from '../Paragraph';

import {theme} from '../../constants/theme';
import { checkNotificationTranslation } from '../../helpers';
import { useTranslation } from 'react-i18next';
import { Text } from 'native-base';

const NotificationModal = ({handleClose, notification}) => {
  const {t} = useTranslation('notifications');
  const {title, message} = notification;
  const [screen, setScreen] = useState(Dimensions.get('screen'));

  useEffect(() => {
    Dimensions.addEventListener('change', () => {
      setScreen(Dimensions.get('screen'));
    });

    return () => {
      Dimensions.removeEventListener('change');
    };
  }, []);

  const _renderText = (message) => {
    if(checkNotificationTranslation(message)) {
      return t(message);
    } else {
      return message;
    }
  }

  return (
    <Wrapper width={screen.width} height={screen.height}>
      <View style={{justifyContent: 'center', height: '100%'}}>
        <Container height={screen.height}>
          <Header>
            <HeaderButton onPress={handleClose}>
              <Ionicons
                name="close-circle-outline"
                size={38}
                color={theme.primaryTextColor}
              />
            </HeaderButton>
            <Paragraph style={styles.title} type="subtitle" alignment="center">
              {_renderText(title)}
            </Paragraph>
          </Header>
          <Content>
            <Field>
              <Text selectable type="label" style={{
                color: theme.tagText
              }}>{_renderText(message)}</Text>
            </Field>
          </Content>
        </Container>
      </View>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  title: {
    marginTop: 16,
    marginBottom: 8,
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default NotificationModal;
