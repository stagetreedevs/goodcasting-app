import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import {
  Wrapper,
  WrapperButton,
  Container,
  Content,
  OptionButton,
  OptionText,
  Label,
} from './styles';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../../constants/theme';
import { useTranslation } from 'react-i18next';

const Option = ({ children, selected, lastOne, first, ...props }) => {
  return (
    <OptionButton
      selected={selected}
      lastOne={lastOne}
      first={first}
      {...props}>
      <MaterialCommunityIcons
        size={24}
        color={theme.tagText}
        name={selected ? 'check-circle' : 'checkbox-blank-circle-outline'}
      />
      <OptionText>{children}</OptionText>
    </OptionButton>
  );
};

const SelectorModal = ({
  handleClose,
  options,
  label,
  selected,
  onChooseOption,
}) => {
  const {t} = useTranslation('jobModal');
  const [screen, setScreen] = useState(Dimensions.get('screen'));

  useEffect(() => {
    Dimensions.addEventListener('change', () => {
      setScreen(Dimensions.get('screen'));
    });

    return () => {
      Dimensions.removeEventListener('change');
    };
  }, []);

  const handleOptionChange = id => {
    onChooseOption(id);
    handleClose();
  };

  return (
    <Wrapper width={screen.width} height={screen.height}>
      <WrapperButton
        onPress={handleClose}
        width={screen.width}
        height={screen.height}
      />
      <Container height={screen.height}>
        <Content>
          <Label>{label}</Label>
          {options.map((option, index) => (
            <Option
              key={option.id}
              selected={selected === option.value}
              first={index === 0}
              lastOne={index === options.length - 1}
              onPress={() => handleOptionChange(option.id)}>
              {t(option.value)}
            </Option>
          ))}
        </Content>
      </Container>
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

export default SelectorModal;
