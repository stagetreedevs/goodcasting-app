import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTranslation} from 'react-i18next';

import {Container, Label} from './styles';

import Paragraph from '../Paragraph';

import {theme} from '../../constants/theme';

const SelectAll = ({onSelectAll, artistCount, selected, ...props}) => {
  const {t} = useTranslation('components');

  return (
    <Container onPress={onSelectAll} {...props}>
      <MaterialCommunityIcons
        name={selected ? 'checkbox-marked' : 'checkbox-blank-outline'}
        color={theme.primaryColor}
        size={20}
      />
      <Label>
        <Paragraph type="small">
          {t('selectAll')} {artistCount ? `(${artistCount})` : ``}
        </Paragraph>
      </Label>
    </Container>
  );
};

export default SelectAll;
