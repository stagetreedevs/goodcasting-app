import React from 'react';
import {StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import {Container} from './styles';

import HeaderWithLogo from '../../components/HeaderWithLogo';
import Paragraph from '../../components/Paragraph';
import Button from '../../components/Button';

const ChoosePayment = () => {
  const {t} = useTranslation('choosePayment');
  return (
    <Container>
      <HeaderWithLogo withGoBack />
      <Paragraph style={styles.text} type="title">
        {t('title')}
      </Paragraph>
      <Paragraph style={styles.text} type="subtitle">
        {t('noPaymentMethod')}
      </Paragraph>
      <Button style={styles.button}>{t('addLabel')}</Button>
      <Paragraph type="small" alignment="center" style={styles.text}>
        {t('timeLeft')} 10 {t('timeLeftMonths')} e 5 {t('timeLeftDays')}
      </Paragraph>
    </Container>
  );
};

const styles = StyleSheet.create({
  text: {
    marginTop: 19,
  },
  button: {
    marginTop: 32,
  },
});

export default ChoosePayment;
