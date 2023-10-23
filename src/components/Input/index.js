import React from 'react';
import {StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Container, InputContainer, InputMaskContainer, Button} from './styles';

import Paragraph from '../Paragraph';

import {theme} from '../../constants/theme';

const Input = ({
  type,
  mask,
  label,
  group,
  required,
  multiline,
  withEye,
  showEye,
  onChangeEye,
  withClear,
  onClear,
  length,
  ...props
}) => {
  return (
    <Container label={label} group={group}>
      {label && (
        <Paragraph style={styles.label} type="label" required={required}>
          {label}
        </Paragraph>
      )}
      {type === 'mask' ? (
        <InputMaskContainer
          type={mask}
          placeholderTextColor={theme.inputPlaceholderTextColor}
          multiline={multiline}
          {...props}
        />
      ) : (
        <InputContainer
          placeholderTextColor={theme.inputPlaceholderTextColor}
          multiline={multiline}
          {...props}
        />
      )}
      {withEye && (
        <Button onPress={onChangeEye}>
          <Ionicons
            name={!showEye ? 'eye' : 'eye-off'}
            size={24}
            color={theme.tagText}
          />
        </Button>
      )}
      {withClear && length >= 1 && (
        <Button onPress={onClear}>
          <Ionicons
            name={'close'}
            size={24}
            color={theme.tagText}
          />
        </Button>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  label: {
    marginBottom: 12,
    color: '#fff'
  },
});

export default Input;
