import React from 'react';
import {TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {Container, ActionContainer, Label, CountLabel} from './styles';

import {theme} from '../../constants/theme';

const Counter = ({id, label, selected, onCountChange, name, ...props}) => {
  return (
    <Container {...props}>
      <Label>{label}</Label>
      <ActionContainer>
        <TouchableOpacity onPress={() => onCountChange(name)}>
          <MaterialCommunityIcons
            name={selected ? 'checkbox-marked' : 'checkbox-blank-outline'}
            size={24}
            color={theme.primaryColor}
          />
        </TouchableOpacity>
      </ActionContainer>
    </Container>
  );
};

export default Counter;
