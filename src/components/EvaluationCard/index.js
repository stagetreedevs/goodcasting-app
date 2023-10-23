import React from 'react';
import {StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/core';
import {
  Container,
  CardTitle,
  CardUser,
  TextBold,
  CardContent,
  CardLocation,
} from './styles';

import Button from '../Button';

import {useAuth} from '../../contexts/auth';

const EvaluationCard = ({toEvaluate, ...props}) => {
  const navigation = useNavigation();
  const {user} = useAuth();
  const {t} = useTranslation('evaluationCard');
  const {has_been_evaluated, invite, job, user: userToEvaluate} = toEvaluate;
  const {name: title, description, location, date, time} = job;
  const {name} = userToEvaluate;

  const goToEvaluation = () =>
    navigation.navigate('Evaluation', {
      toEvaluate: {invite, job, userToEvaluate},
    });

  return (
    <Container {...props}>
      <CardTitle>{title}</CardTitle>
      <CardUser>
        {user.type === 'Cliente'
          ? <>{t('model')}: <TextBold>{name}</TextBold></>
          : <>{t('client')}: <TextBold>{name}</TextBold></>
        }
      </CardUser>
      <CardContent>{description}</CardContent>
      <CardLocation>
        {location} - {date} ÀS {time}
      </CardLocation>
      {!has_been_evaluated && (
        <Button
          onPress={goToEvaluation}
          style={styles.button}
          type="confirm"
          alignSelf="center">
          {user.type === 'Cliente' ? 'Avaliar artista' : 'Avaliar cliente'}
        </Button>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  button: {
    marginBottom: 8,
    width: '100%',
  },
});

export default EvaluationCard;
